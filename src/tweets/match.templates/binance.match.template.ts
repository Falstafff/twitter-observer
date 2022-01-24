import { BaseMatchTemplate } from './base.match.template';
import { BaseTestCase } from '../matcher/base.test.case';
import { AnnouncementTypes, REGEX } from '../../constants';

export class BinanceMatchTemplate extends BaseMatchTemplate {
  constructor() {
    super();
    this.matchTemplates = [
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.COIN_SYMBOL],
        ['binance', 'will', 'list'],
        1,
      ),
    ];
  }
}
