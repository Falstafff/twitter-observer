import { Tweet } from './tweet.entity';
import { Exchange } from '../exchanges/exchange.entity';
import { BaseMatchTemplate } from './match.templates/base.match.template';
import { BaseTestCase } from './base.test.case';
import { MATCH_TEMPLATES } from './match.templates';

export class TweetMatcher {
  private readonly matchTemplates;

  constructor() {
    this.matchTemplates = MATCH_TEMPLATES;
  }

  findTestCaseMatch(tweet: Tweet, exchange: Exchange) {
    const matchTemplate: BaseMatchTemplate = this.matchTemplates[exchange.name];

    if (!matchTemplate) {
      console.error(
        `MatchTemplate is not found for the next exchange: ${exchange.name}`,
      );
      return null;
    }

    const passedTestCase: BaseTestCase = matchTemplate.findTemplateMatch(tweet);

    if (!passedTestCase) {
      console.log(
        `${exchange.name}: no template matches for the next tweet: \n \n ${tweet.text}`,
      );
      return null;
    }

    return passedTestCase;
  }
}
