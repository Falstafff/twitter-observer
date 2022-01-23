import { BaseTestCase } from '../matcher/base.test.case';

export class BaseMatchTemplate {
  protected matchTemplates: BaseTestCase[];

  findTemplateMatch(text: string): BaseTestCase {
    let passedTestCase: BaseTestCase;

    this.matchTemplates.some((filter, index) => {
      const isPassed = filter.test(text);
      if (isPassed) passedTestCase = this.matchTemplates[index];
      return isPassed;
    });

    return passedTestCase;
  }
}
