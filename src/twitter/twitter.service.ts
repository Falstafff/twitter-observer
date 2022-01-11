import { Injectable } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';
import { TweetV1 } from 'twitter-api-v2/dist/types';
import TweetStream from 'twitter-api-v2/dist/stream/TweetStream';

@Injectable()
export class TwitterService {
  private twitterApi: TwitterApi;

  constructor(private configService: ConfigService) {
    this.twitterApi = new TwitterApi({
      appKey: configService.get('TWITTER_APP_KEY'),
      appSecret: configService.get('TWITTER_APP_SECRET'),
      accessToken: configService.get('TWITTER_ACCESS_TOKEN'),
      accessSecret: configService.get('TWITTER_ACCESS_SECRET'),
    });
  }

  async getTwitterFilterStream(
    followIds: string[],
  ): Promise<TweetStream<TweetV1>> {
    let stream;

    try {
      stream = await this.twitterApi.v1.filterStream({
        follow: followIds,
      });
    } catch (e) {
      console.error(e);
    }

    return stream;
  }
}
