export const deepClone = obj => {
  const clone = Object.assign({}, obj);
  Object.keys(clone).forEach(key => {
    clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
  });
  let res = clone;
  if (Array.isArray(obj)) {
    res = (clone.length = obj.length) && Array.from(clone);
  }
  return res;
};

export const isEmpty = val => val == null || !(Object.keys(val) || val).length;
