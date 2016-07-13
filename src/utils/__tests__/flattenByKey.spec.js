import { expect } from 'chai';

import flattenByKey from '../flattenByKey';

describe('utils: flattenByKey', () => {
  const originalArray = [
    {
      k: [1, 2],
    },
    {
      k: [3],
    },
  ];
  const expected = [1, 2, 3];
  it('should flatten correctly', () => {
    expect(flattenByKey(originalArray, 'k')).to.eql(expected);
  });
});
