import { StreamingV2Rule } from 'twitter-api-v2/dist/types/v2/streaming.v2.types';

export class TwitterStreamRule {
  private streamRule: StreamingV2Rule;

  constructor(streamRule: StreamingV2Rule) {
    this.streamRule = streamRule;
  }

  get id() {
    return this.streamRule.id;
  }

  get value() {
    return this.streamRule.value;
  }

  get tag() {
    return this.streamRule.tag;
  }
}
