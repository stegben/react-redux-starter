// flattenByKey.js
//
// flatten array of objects by one of its key. The value of it must be a array
//
// ex: concat all comments of each articles

const flattenByKey = (objectArray, by) => (
  objectArray
    .map(item => item[by])
    .reduce((a, b) => a.concat(b), [])
);

export default flattenByKey;
