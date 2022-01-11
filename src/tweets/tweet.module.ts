import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TwitterModule } from '../twitter/twitter.module';

@Module({
  imports: [TwitterModule],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
