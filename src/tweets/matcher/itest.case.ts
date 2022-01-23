export interface ITestCase {
  test(item: unknown): boolean;
  get matchedRegex();
  get type();
}
