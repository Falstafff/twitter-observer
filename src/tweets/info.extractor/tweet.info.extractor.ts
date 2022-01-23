import { Exchange } from '../../exchanges/exchange.entity';
import { BaseTestCase } from '../matcher/base.test.case';
import { CoinListingEntity } from '../../listing/coin.listing.entity';
import { BaseTextScrapper } from '../scrapper/base.text.scrapper';
import { SourceEnum } from '../../exchanges/source.enum';
import { TweetEntity } from '../tweet.entity';

export class TweetInfoExtractor {
  extractInfoFromTweet(
    tweet: TweetEntity,
    exchange: Exchange,
    passedTestCase: BaseTestCase,
  ): CoinListingEntity {
    const textScrapper = new BaseTextScrapper(passedTestCase.matchedRegex);

    return new CoinListingEntity({
      id: undefined,
      title: tweet.text,
      coinSymbol: textScrapper.scrap(tweet.text),
      href: '',
      platform: exchange.type,
      type: passedTestCase.type,
      source: SourceEnum.twitter,
    });
  }
}
