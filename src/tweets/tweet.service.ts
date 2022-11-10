import { Injectable, Logger } from '@nestjs/common';
import { TweetEntity } from './tweet.entity';
import { TwitterService } from '../twitter/twitter.service';
import { EventsService } from '../events/events.service';
import { BaseTemplateMatcher } from './matcher/base.template.matcher';
import { TweetInfoExtractor } from './info.extractor/tweet.info.extractor';
import { AnnouncementCollection } from '../announcement/announcement.collection';
import { BaseTestCase } from './matcher/base.test.case';
import { TwitterExchangesCollection } from './twitter.exchanges.collection';
import { AnnouncementService } from '../announcement/announcement.service';
import { twitterExchanges } from './twitter.exchanges';
import { Announcement } from '../announcement/entities/announcement.entity';

@Injectable()
export class TweetService {
  private tweetMatcher: BaseTemplateMatcher;
  private tweetInfoExtractor: TweetInfoExtractor;
  private twitterExchanges: TwitterExchangesCollection;

  constructor(
    private twitterService: TwitterService,
    private announcementsService: AnnouncementService,
    private eventsService: EventsService,
  ) {
    this.twitterExchanges = twitterExchanges;
    this.eventsService = eventsService;
    this.tweetMatcher = new BaseTemplateMatcher();
    this.tweetInfoExtractor = new TweetInfoExtractor();
  }

  async startExchangesTweetsStream() {
    const exchangesTweetStream =
      await this.twitterService.getTwitterSearchStream();

    if (!exchangesTweetStream) {
      Logger.error('Exchanges tweet stream is not defined');
      return null;
    }

    for await (const tweet of exchangesTweetStream) {
      Logger.log(JSON.stringify(tweet));
      try {
        await this.processTweet(new TweetEntity(tweet));
      } catch (e) {
        Logger.error(e);
      }
    }
    // this.processTweet({
    //   tag: 'coinbase' as ExchangesEnum,
    //   text: 'Coinbase will add support for Boba Network (BOBA) and Gemini USD (GUSD) (TESTER) on the Ethereum network (ERC-20 token). Do not send this asset over other networks or your funds may be lost.',
    // } as TweetEntity);
  }

  async processTweet(tweetEntity: TweetEntity) {
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

    const announcement: Announcement =
      this.tweetInfoExtractor.extractInfoFromTweet(
        tweetEntity,
        exchange,
        testCase,
      );

    if (!(await this.announcementsService.isNewAnnouncement(announcement))) {
      Logger.log(`Test case was matched but the listing was already added`);
      return null;
    }

    const collection: AnnouncementCollection = new AnnouncementCollection([
      announcement,
    ]);

    await Promise.allSettled([
      this.eventsService.putImportantNewsEvent(collection),
      this.announcementsService.bulkCreate(collection),
    ]);

    Logger.log(`New coin listing: ${JSON.stringify(collection.getItems())}`);
  }
}
