import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TwitterModule } from './twitter/twitter.module';
import { TweetModule } from './tweets/tweet.module';
import { EventsModule } from './events/events.module';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_DEFAULT_REGION: Joi.string().required(),
        TWITTER_APP_KEY: Joi.string().required(),
        TWITTER_APP_SECRET: Joi.string().required(),
        TWITTER_ACCESS_TOKEN: Joi.string().required(),
        TWITTER_ACCESS_SECRET: Joi.string().required(),
      }),
    }),
    TwitterModule,
    TweetModule,
    EventsModule,
    ListingModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
