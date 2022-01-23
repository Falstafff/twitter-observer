import { IScrapper } from './iscrapper';

export class BaseTextScrapper implements IScrapper {
  private readonly _matchRegex;
  private readonly _replaceRegex;

  constructor(_matchRegex: RegExp, replaceRegex: RegExp = /[^\w\/,]/g) {
    this._matchRegex = _matchRegex;
    this._replaceRegex = replaceRegex;
  }

  scrap(str: string) {
    return (str.match(new RegExp(this._matchRegex)) || [])
      .map((item) =>
        this._replaceRegex
          ? item.replace(new RegExp(this._replaceRegex), '')
          : item,
      )
      .join(',');
  }
}
