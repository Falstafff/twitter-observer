import * as Joi from '@hapi/joi';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TwitterModule } from './twitter/twitter.module';
import { TweetModule } from './tweets/tweet.module';
import { EventsModule } from './events/events.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_DEFAULT_REGION: Joi.string().required(),
        TWITTER_BEARER_TOKEN: Joi.string().required(),
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    DatabaseModule,
    TwitterModule,
    TweetModule,
    EventsModule,
    AnnouncementModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
