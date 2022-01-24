import { Exchange } from '../../exchanges/exchange.entity';
import { BaseTestCase } from './base.test.case';
import { Logger } from '@nestjs/common';

export class BaseTemplateMatcher {
  findTestCaseMatch(exchange: Exchange, text: string) {
    const passedTestCase: BaseTestCase =
      exchange.matchTemplate.findTemplateMatch(text);

    if (!passedTestCase) {
      Logger.log(
        `${exchange.type}: no template matches for the next post: ${text}`,
      );
      return null;
    }

    return passedTestCase;
  }
}
