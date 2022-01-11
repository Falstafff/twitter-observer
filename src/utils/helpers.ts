export const reduceByKey = (
  key: string | number,
  items: Record<string | number, any>,
): Record<string | number, any> =>
  items.reduce((acc, cur) => {
    if (!acc[cur[key]]) {
      acc[cur[key]] = [];
    }

    acc[cur[key]].push(cur);

    return acc;
  }, {});

export const sumArray = (nums) => nums.reduce((prev, cur) => prev + cur);

export const isStringContainsMoreExpectedWords = (
  str: string,
  expectedWords: string[],
  percentsMatch: number = 0.6,
): boolean => {
  const expectedWordsCount = Object.values(
    expectedWords.reduce((acc, cur) => {
      acc[cur] = str.toLowerCase().includes(cur) ? 1 : 0;
      return acc;
    }, {}),
  );

  return (
    sumArray(expectedWordsCount) / expectedWordsCount.length >= percentsMatch
  );
};
