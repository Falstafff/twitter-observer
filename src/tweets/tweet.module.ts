import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TwitterModule } from '../twitter/twitter.module';
import { EventsModule } from '../events/events.module';
import { AnnouncementModule } from '../announcement/announcement.module';

@Module({
  imports: [TwitterModule, EventsModule, AnnouncementModule],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
