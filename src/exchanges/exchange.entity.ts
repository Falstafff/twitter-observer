export class Exchange {
  private readonly _name: string;
  private readonly _twitterId: string;

  constructor(name: string, twitterId: string) {
    this._name = name;
    this._twitterId = twitterId;
  }

  get name(): string {
    return this._name;
  }

  get twitterId(): string {
    return this._twitterId;
  }
}
