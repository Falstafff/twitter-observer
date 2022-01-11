import { Tweet } from './tweet.entity';
import { Exchange } from '../exchanges/exchange.entity';
import { BaseTestCase } from './base.test.case';
import { BaseTextScrapper } from './base.text.scrapper';
import { CoinListingEntity } from './coin.listing.entity';

export class TweetInfoExtractor {
  constructor() {}

  extractInfoFromTweet(
    tweet: Tweet,
    exchange: Exchange,
    passedTestCase: BaseTestCase,
  ): CoinListingEntity {
    const textScrapper = new BaseTextScrapper(passedTestCase.matchedRegex);

    return new CoinListingEntity({
      id: undefined,
      title: tweet.text,
      coinSymbol: textScrapper.scrap(tweet.text),
      href: '',
      platform: exchange.name,
      type: passedTestCase.type,
      source: 'twitter',
    });
  }
}
