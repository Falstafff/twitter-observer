import { BaseCollection } from '../utils/collection';
import { CoinListingEntity } from './coin.listing.entity';

export class CoinEntitiesCollection extends BaseCollection {
  protected readonly items: CoinListingEntity[];

  hasNewListings(externalNews: CoinListingEntity) {
    return !this.items.some(
      (_databaseNews) =>
        externalNews.coinSymbol === _databaseNews.coinSymbol &&
        externalNews.platform === _databaseNews.platform &&
        externalNews.title === _databaseNews.title,
    );
  }

  static fromArray(news: Record<string, any>[]): CoinEntitiesCollection {
    return new CoinEntitiesCollection(
      news.map((item) => new CoinListingEntity(item as any)),
    );
  }
}
