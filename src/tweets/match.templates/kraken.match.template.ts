import { AnnouncementTypes, REGEX } from '../constants';
import { BaseTestCase } from '../base.test.case';
import { BaseMatchTemplate } from './base.match.template';

export class KrakenMatchTemplate extends BaseMatchTemplate {
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
