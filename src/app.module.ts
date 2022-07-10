import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
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
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
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
