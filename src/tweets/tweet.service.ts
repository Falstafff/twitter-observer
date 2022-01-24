import { Injectable, Logger } from '@nestjs/common';
import { TweetEntity } from './tweet.entity';
import { TwitterService } from '../twitter/twitter.service';
import { ListingService } from '../listing/listing.service';
import { EventsService } from '../events/events.service';
import { BaseTemplateMatcher } from './matcher/base.template.matcher';
import { TweetInfoExtractor } from './info.extractor/tweet.info.extractor';
import { CoinEntitiesCollection } from '../listing/coin.entities.collection';
import { BaseTestCase } from './matcher/base.test.case';
import { CoinListingEntity } from '../listing/coin.listing.entity';
import { TwitterExchangesCollection } from './twitter.exchanges.collection';
import { twitterExchanges } from './twitter.exchanges';

@Injectable()
export class TweetService {
  private tweetMatcher: BaseTemplateMatcher;
  private tweetInfoExtractor: TweetInfoExtractor;
  private twitterExchanges: TwitterExchangesCollection;

  constructor(
    private twitterService: TwitterService,
    private listingService: ListingService,
    private eventsService: EventsService,
  ) {
    this.twitterExchanges = twitterExchanges;
    this.eventsService = eventsService;
    this.listingService = listingService;
    this.tweetMatcher = new BaseTemplateMatcher();
    this.tweetInfoExtractor = new TweetInfoExtractor();
  }

  async startExchangesTweetsStream() {
    // await this.twitterService.addStreamRules(
    //   this.twitterExchanges.mapToTwitterStreamRules(),
    // );

    const exchangesTweetStream =
      await this.twitterService.getTwitterSearchStream();

    if (!exchangesTweetStream) {
      Logger.error('Exchanges tweet stream is not defined');
      return null;
    }

    for await (const tweet of exchangesTweetStream) {
      try {
        const tweetEntity = new TweetEntity(tweet);
        await this.processTweet(tweetEntity);
      } catch (e) {
        Logger.error(e);
      }
    }
  }

  async processTweet(tweetEntity: TweetEntity) {
    Logger.log(JSON.stringify(tweetEntity));

    const exchange = this.twitterExchanges.getExchangeUsingExchangeEnum(
      tweetEntity.tag,
    );

    if (!exchange) {
      Logger.error(`Exchange is not defined`);
      return null;
    }

    const testCase: BaseTestCase = this.tweetMatcher.findTestCaseMatch(
      exchange,
      tweetEntity.text,
    );

    if (!testCase) {
      Logger.log(`No matches for the ${exchange.type} tweet`);
      return null;
    }

    const coinListingEntity: CoinListingEntity =
      this.tweetInfoExtractor.extractInfoFromTweet(
        tweetEntity,
        exchange,
        testCase,
      );

    const databaseNews = await this.listingService.getAllCoinListings();

    if (!databaseNews.hasNewListings(coinListingEntity)) {
      Logger.log(`Test case was matched but the listing was already added`);
      return null;
    }

    const collection: CoinEntitiesCollection = new CoinEntitiesCollection([
      coinListingEntity,
    ]);

    await Promise.allSettled([
      this.eventsService.putImportantNewsEvent(collection),
      this.listingService.addImportantNews(collection),
    ]);

    Logger.log(
      `New coin listing was found: ${JSON.stringify(collection.getItems())}`,
    );
  }
}
