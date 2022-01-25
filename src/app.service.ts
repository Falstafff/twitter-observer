import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TweetService } from './tweets/tweet.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private tweetService: TweetService) {}

  async onModuleInit() {
    Logger.log('Starting twitter observer listener...');

    try {
      await this.tweetService.startExchangesTweetsStream();
    } catch (e) {
      Logger.error(`Error during tweets stream: ${e.message}`);
      process.exit(0);
    }
  }
}
