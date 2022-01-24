import { Exchange } from '../exchanges/exchange.entity';
import { BaseCollection } from '../utils/collection';
import { ExchangesEnum } from '../exchanges/exchanges.enum';

export class TwitterExchangesCollection extends BaseCollection {
  private readonly exchangesByType: Record<ExchangesEnum, Exchange>;

  constructor(items: Exchange[]) {
    super(items);
    this.exchangesByType = this.organizedBy('type');
  }

  getExchangeUsingExchangeEnum(type: ExchangesEnum): Exchange {
    return this.exchangesByType[type][0];
  }

  isExchange(id: string): boolean {
    return id in this.exchangesByType;
  }

  mapToTwitterStreamRules() {
    return this.items.map(({ id, type }: Exchange) => ({
      value: `from:${id}`,
      tag: type,
    }));
  }
}
