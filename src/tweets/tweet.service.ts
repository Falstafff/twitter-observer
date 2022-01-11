import { Injectable } from '@nestjs/common';
import { ExchangesCollection } from '../exchanges/exchanges.collection';
import { SUPPORTED_EXCHANGES } from '../exchanges/exchanges.store';
import { TweetMatcher } from './tweet.matcher';
import { TweetInfoExtractor } from './tweet.info.extractor';
import { Tweet } from './tweet.entity';
import { BaseTestCase } from './base.test.case';
import { CoinListingEntity } from './coin.listing.entity';
import { TwitterService } from '../twitter/twitter.service';

@Injectable()
export class TweetService {
  private tweetMatcher: TweetMatcher;
  private tweetInfoExtractor: TweetInfoExtractor;
  private exchangesCollection: ExchangesCollection;

  constructor(private twitterService: TwitterService) {
    this.tweetMatcher = new TweetMatcher();
    this.tweetInfoExtractor = new TweetInfoExtractor();
    this.exchangesCollection = <ExchangesCollection>(
      ExchangesCollection.fromArray(SUPPORTED_EXCHANGES)
    );
  }

  async startExchangesTweetsStream() {
    try {
      const tweetStream = await this.twitterService.getTwitterFilterStream(
        this.exchangesCollection.pluck('twitter_id'),
      );

      for await (const tweet of tweetStream) {
        try {
          const _tweet = new Tweet(tweet);
          await this.processTweet(_tweet);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      await this.startExchangesTweetsStream();
    }
  }

  async processTweet(tweet: Tweet) {
    if (!this.exchangesCollection.hasExchange(tweet.userId)) {
      return;
    }

    const exchange = this.exchangesCollection.getExchangeByUserId(tweet.userId);

    console.log(`New post from ${exchange.name}: ${tweet.text}`);

    const passedTestCase: BaseTestCase = this.tweetMatcher.findTestCaseMatch(
      tweet,
      exchange,
    );

    if (!passedTestCase) {
      return null;
    }

    const coinListingEntity: CoinListingEntity =
      this.tweetInfoExtractor.extractInfoFromTweet(
        tweet,
        exchange,
        passedTestCase,
      );

    console.log(coinListingEntity);
  }
}
