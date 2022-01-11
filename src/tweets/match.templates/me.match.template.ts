import { BaseMatchTemplate } from './base.match.template';
import { BaseTestCase } from '../base.test.case';
import { AnnouncementTypes, REGEX } from '../constants';

export class MeMatchTemplate extends BaseMatchTemplate {
  constructor() {
    super();
    this.matchTemplates = [
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.$_SYMBOL],
        ['new', 'list', 'kraken'],
        1,
      ),
    ];
  }
}
