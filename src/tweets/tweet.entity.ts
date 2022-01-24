import { TweetV2SingleStreamResult } from 'twitter-api-v2/dist/types/v2/tweet.v2.types';
import { ExchangesEnum } from '../exchanges/exchanges.enum';

export class TweetEntity {
  private readonly tweet: TweetV2SingleStreamResult;

  constructor(tweet: TweetV2SingleStreamResult) {
    this.tweet = tweet;
  }

  get id() {
    return this.tweet.data.id;
  }

  get text() {
    return this.tweet.data.text;
  }

  get tag(): ExchangesEnum {
    return <ExchangesEnum>this.tweet.matching_rules[0].tag;
  }
}
