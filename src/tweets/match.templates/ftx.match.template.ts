import { AnnouncementTypes, REGEX } from '../constants';
import { BaseMatchTemplate } from './base.match.template';
import { BaseTestCase } from '../base.test.case';

export class FtxMatchTemplate extends BaseMatchTemplate {
  constructor() {
    super();
    this.matchTemplates = [
      new BaseTestCase(
        AnnouncementTypes.listing,
        [REGEX.$_SYMBOL],
        ['ftx', 'upcoming', 'list'],
        1,
      ),
    ];
  }
}
