// getSums([1, 2, 3, 4, 5])
// [(1, 3, 6, 10, 15)];

const getSums = (arr) => {
  // const summ = arr.reduce((accum, elem, index, arr) => {
  //   if (index === 0) {
  //     accum.push(elem);
  //     return accum;
  //   }
  //   accum.push(accum[index - 1] + elem);
  //   return accum;
  // }, []);

  // return summ;

  //   const summ = arr.reduce((accum, elem, index, arr) => {
  //     if (index === 0) {
  //       return [elem];
  //     }
  //     return [...accum, accum[index - 1] + elem];
  //   }, []);

  //   return summ;
  // };

  const summ = arr.reduce(
    (accum, elem, index, arr) =>
      index === 0 ? [elem] : [...accum, accum[index - 1] + elem],
    []
  );
  return summ;
};

console.log(getSums([1, 2, 3, 4, 5]));
