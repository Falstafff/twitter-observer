import { reduceByKey } from './helpers';

export class BaseCollection {
  protected readonly items: any[];

  constructor(items: any[]) {
    this.items = Array.isArray(items) ? items : [];
  }

  static fromArray(items: Record<string, any>[]) {
    return new this(items.map((item) => item));
  }

  hasItems() {
    return this.items.length;
  }

  getItems() {
    return this.items;
  }

  push(item: any) {
    this.items.push(item);
  }

  pluck(key) {
    return this.items.map((item) => item[key]);
  }

  organizedBy(key) {
    return reduceByKey(key, this.items);
  }
}
