import { SourceEnum } from './source.enum';
import { BaseMatchTemplate } from '../tweets/match.templates/base.match.template';
import { ExchangesEnum } from './exchanges.enum';

export class Exchange {
  private readonly _id: string;
  private readonly _type: ExchangesEnum;
  private readonly _source: SourceEnum;
  private readonly _matchTemplate: BaseMatchTemplate;

  constructor(
    id: string,
    type: ExchangesEnum,
    source: SourceEnum,
    matchTemplate: BaseMatchTemplate,
  ) {
    this._id = id;
    this._type = type;
    this._source = source;
    this._matchTemplate = matchTemplate;
  }

  get id(): string {
    return this._id;
  }

  get source(): string {
    return this._source;
  }

  get type(): string {
    return this._type;
  }

  get matchTemplate(): BaseMatchTemplate {
    return this._matchTemplate;
  }
}
