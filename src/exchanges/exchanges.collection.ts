import { BaseCollection } from '../utils/collection';
import { Exchange } from './exchange.entity';

export class ExchangesCollection extends BaseCollection {
  private readonly exchangesByTwitterId;

  constructor(items: Exchange[]) {
    super(items);
    this.exchangesByTwitterId = this.organizedBy('twitter_id');
  }

  getExchangeByUserId(id): Exchange {
    return this.exchangesByTwitterId[id][0];
  }

  hasExchange(id: number): boolean {
    return id in this.exchangesByTwitterId;
  }
}
