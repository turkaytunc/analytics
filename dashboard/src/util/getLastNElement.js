const getLastNElement = (arr = [], n = 1) => {
  return arr.length > n ? arr.slice(-n) : arr;
};

export default getLastNElement;
