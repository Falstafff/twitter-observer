import { Injectable, Logger } from '@nestjs/common';
import { TwitterApi } from 'twitter-api-v2';
import { ConfigService } from '@nestjs/config';
import { TwitterStreamRuleCollection } from './twitter.stream.rule.collection';

@Injectable()
export class TwitterService {
  private twitterApi: TwitterApi;

  constructor(private configService: ConfigService) {
    this.twitterApi = new TwitterApi(
      'AAAAAAAAAAAAAAAAAAAAAAZ3XwEAAAAAGY6o%2F4gGf0k2HJWl5wGk4jycEhw%3DBVfVQY5H8dyfqnmqbAuxXOjJ9UbRotN4EfWgfk57iP5lwyjv8N',
    );
  }

  async getTwitterSearchStream() {
    return this.twitterApi.v2.searchStream();
  }

  async addStreamRules(rules) {
    return this.twitterApi.v2.updateStreamRules({
      add: rules,
    });
  }

  async getStreamRules() {
    let rulesCollection = new TwitterStreamRuleCollection([]);

    try {
      const { data } = await this.twitterApi.v2.streamRules();
      rulesCollection = TwitterStreamRuleCollection.fromArray(data ?? []);
    } catch (e) {
      Logger.error(e);
    }

    return rulesCollection;
  }

  async deleteStreamRules(ids) {
    return this.twitterApi.v2.updateStreamRules({
      delete: {
        ids,
      },
    });
  }
}
