import { BaseMatchTemplate } from './base.match.template';
import { BaseTestCase } from '../matcher/base.test.case';
import { AnnouncementTypes, REGEX } from '../../constants';

export class CoinoneMatchTemplate extends BaseMatchTemplate {
  constructor() {
    super();
    this.matchTemplates = [
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.$_SYMBOL],
        ['listing', '@coinone'],
        1,
      ),
    ];
  }
}
