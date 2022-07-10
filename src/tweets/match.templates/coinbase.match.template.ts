import { BaseMatchTemplate } from './base.match.template';
import { BaseTestCase } from '../matcher/base.test.case';
import { AnnouncementTypes, REGEX } from '../../constants';

export class CoinbaseMatchTemplate extends BaseMatchTemplate {
  constructor() {
    super();
    this.matchTemplates = [
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.COIN_SYMBOL],
        ['now', 'available', 'coinbase'],
        1,
      ),
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.COIN_SYMBOL],
        ['coinbase', 'will', 'add', 'support'],
        0.75,
      ),
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.$_SYMBOL],
        ['coinbase', 'custody', 'now', 'supports', 'deposits'],
        1,
      ),
    ];
  }
}
