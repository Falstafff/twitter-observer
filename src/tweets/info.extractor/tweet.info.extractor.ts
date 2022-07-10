import { Exchange } from '../../exchanges/exchange.entity';
import { BaseTestCase } from '../matcher/base.test.case';
import { BaseTextScrapper } from '../scrapper/base.text.scrapper';
import { SourceEnum } from '../../exchanges/source.enum';
import { TweetEntity } from '../tweet.entity';
import { Announcement } from '../../announcement/entities/announcement.entity';

export class TweetInfoExtractor {
  extractInfoFromTweet(
    tweet: TweetEntity,
    exchange: Exchange,
    passedTestCase: BaseTestCase,
  ): Announcement {
    const textScrapper = new BaseTextScrapper(passedTestCase.matchedRegex);
    const announcement = new Announcement();

    announcement.title = tweet.text;
    announcement.coinSymbol = textScrapper.scrap(tweet.text);
    announcement.link = '';
    announcement.platform = exchange.type;
    announcement.type = passedTestCase.type;
    announcement.source = SourceEnum.twitter;
    announcement.detectionDate = new Date().toISOString();

    return announcement;
  }
}
