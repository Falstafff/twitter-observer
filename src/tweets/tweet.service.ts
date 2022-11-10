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
import { Announcement } from '../announcement/announcement.entity';
import { Exchange } from '../exchanges/exchange.entity';
import { ExchangesEnum } from '../exchanges/exchanges.enum';

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

  public async startExchangesTweetsStream() {
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
    //   text: 'Asset added to the roadmap today: Vulcan Forged PYR (PYR)',
    // } as TweetEntity);
  }

  public async processTweet(tweetEntity: TweetEntity) {
    const exchange: Exchange =
      this.twitterExchanges.getExchangeUsingExchangeEnum(tweetEntity.tag);

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

    await Promise.allSettled([
      this.eventsService.putImportantNewsEvent([announcement]),
      this.announcementsService.create([announcement]),
    ]);

    Logger.log(`New coin listing: ${JSON.stringify([announcement])}`);
  }
}
