import { Exchange } from '../exchanges/exchange.entity';
import { BaseCollection } from '../utils/collection';

export class TwitterExchangesCollection extends BaseCollection {
  private readonly exchangesByTwitterId;

  constructor(items: Exchange[]) {
    super(items);
    this.exchangesByTwitterId = this.organizedBy('id');
  }

  getExchangeByUserId(id): Exchange {
    return this.exchangesByTwitterId[id][0];
  }

  hasExchange(id: number): boolean {
    return id in this.exchangesByTwitterId;
  }
}
