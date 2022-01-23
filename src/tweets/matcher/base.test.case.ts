import { ITestCase } from './itest.case';
import { isStringContainsMoreExpectedWords } from '../../utils/helpers';

export class BaseTestCase implements ITestCase {
  private readonly _type;
  private _regexMatchIndex;
  private readonly _matchRegexes;
  private readonly _expectedWords;
  private readonly _matchPercentage;

  constructor(
    type: string,
    matchRegexes: RegExp[],
    expectedWords: string[],
    matchPercentage: number,
  ) {
    this._type = type;
    this._expectedWords = expectedWords;
    this._matchRegexes = matchRegexes;
    this._matchPercentage = matchPercentage;
  }

  public test(text: string): boolean {
    return (
      isStringContainsMoreExpectedWords(
        text,
        this._expectedWords,
        this._matchPercentage,
      ) && this.isTextContainsListingCoinSymbol(text)
    );
  }

  private isTextContainsListingCoinSymbol(title: string): boolean {
    return this._matchRegexes.some((regex, index) => {
      const isTestPassed = new RegExp(regex).test(title);

      if (isTestPassed) {
        this._regexMatchIndex = index;
      }

      return isTestPassed;
    });
  }

  get matchedRegex() {
    if (!(this._regexMatchIndex >= 0)) {
      throw new Error('Regex match index is not defined');
    }

    return this._matchRegexes[this._regexMatchIndex];
  }

  get type() {
    return this._type;
  }
}
