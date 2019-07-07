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

export const findMember = (tree = [], selector) => {
  if (!selector) return tree[0];

  const members = selector.split('.');
  let currentNode = { children: tree };
  members.forEach(name => {
    currentNode = (currentNode.children || []).find(ele => ele.name === name);
  });
  return currentNode;
};

export const pickRandom = list => {
  return list[Math.floor(Math.random() * list.length)];
};
