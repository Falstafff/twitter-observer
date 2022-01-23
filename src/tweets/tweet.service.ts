import { Injectable } from '@nestjs/common';
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
  private databaseNews: CoinEntitiesCollection;

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
    this.databaseNews = new CoinEntitiesCollection([]);
  }

  async startExchangesTweetsStream() {
    const exchangesTweetStream =
      await this.twitterService.getTwitterFilterStream(
        this.twitterExchanges.pluck('id'),
      );

    await this.initDatabaseNews();

    if (!exchangesTweetStream) {
      console.error('Exchanges tweet stream is not defined');
      return;
    }

    for await (const tweet of exchangesTweetStream) {
      try {
        const _tweet = new TweetEntity(tweet);
        await this.processTweet(_tweet);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async processTweet(tweet: TweetEntity) {
    if (!this.twitterExchanges.hasExchange(tweet.userId)) {
      return null;
    }

    const exchange = this.twitterExchanges.getExchangeByUserId(tweet.userId);
    const testCase: BaseTestCase = this.tweetMatcher.findTestCaseMatch(
      exchange,
      tweet.text,
    );

    if (!testCase) {
      console.log(`No matches for the ${exchange.type} tweet: ${tweet.text}`);
      return null;
    }

    const coinListingEntity: CoinListingEntity =
      this.tweetInfoExtractor.extractInfoFromTweet(tweet, exchange, testCase);

    if (!this.databaseNews.hasNewListings(coinListingEntity)) {
      console.log(`Test case was matched but the listing was already added`);
      return null;
    }

    const collection: CoinEntitiesCollection = new CoinEntitiesCollection([
      coinListingEntity,
    ]);

    await Promise.allSettled([
      this.eventsService.putImportantNewsEvent(collection),
      this.listingService.addImportantNews(collection),
      this.initDatabaseNews(),
    ]);

    console.log(
      `New coin listing was found: ${JSON.stringify(collection.getItems())}`,
    );
  }

  async initDatabaseNews() {
    this.databaseNews = await this.listingService.getAllCoinListings();
  }
}
