import { v4 as uuid } from 'uuid';

export class CoinListingEntity {
  public readonly id;
  public title;
  public coinSymbol;
  public href;
  public platform;
  public type;
  public readonly createdAt;
  private source;

  constructor({ id, title, coinSymbol, href, platform, type, source }) {
    this.id = id || uuid();
    this.title = title;
    this.coinSymbol = coinSymbol;
    this.href = href;
    this.platform = platform;
    this.type = type;
    this.source = source;
    this.createdAt = new Date().toISOString();
  }
}
