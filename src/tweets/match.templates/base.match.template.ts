import { BaseTestCase } from '../base.test.case';
import { Tweet } from '../tweet.entity';

export class BaseMatchTemplate {
  protected matchTemplates: BaseTestCase[];

  findTemplateMatch(tweet: Tweet): BaseTestCase {
    let passedTestCase: BaseTestCase;

    this.matchTemplates.some((filter, index) => {
      const isPassed = filter.test(tweet.text);
      if (isPassed) passedTestCase = this.matchTemplates[index];
      return isPassed;
    });

    return passedTestCase;
  }
}
