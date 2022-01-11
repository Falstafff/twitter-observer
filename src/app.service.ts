import { Injectable, OnModuleInit } from '@nestjs/common';
import { TweetService } from './tweets/tweet.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private tweetService: TweetService) {}

  async onModuleInit() {
    await this.tweetService.startExchangesTweetsStream();
  }
}
