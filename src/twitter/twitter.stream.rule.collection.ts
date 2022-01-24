import { BaseCollection } from '../utils/collection';
import { TwitterStreamRule } from './twitter.stream.rule';
import { StreamingV2Rule } from 'twitter-api-v2/dist/types/v2/streaming.v2.types';

export class TwitterStreamRuleCollection extends BaseCollection {
  static fromArray(items: StreamingV2Rule[]) {
    return new this(items.map((item) => new TwitterStreamRule(item)));
  }
}
