import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TwitterModule } from '../twitter/twitter.module';
import { ListingModule } from '../listing/listing.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TwitterModule, ListingModule, EventsModule],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
