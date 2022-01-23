import { Exchange } from '../../exchanges/exchange.entity';
import { BaseTestCase } from './base.test.case';

export class BaseTemplateMatcher {
  findTestCaseMatch(exchange: Exchange, text: string) {
    const passedTestCase: BaseTestCase =
      exchange.matchTemplate.findTemplateMatch(text);

    if (!passedTestCase) {
      console.log(
        `${exchange.type}: no template matches for the next post: \n \n ${text}`,
      );
      return null;
    }

    return passedTestCase;
  }
}
