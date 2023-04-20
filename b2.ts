const maxPosition = (array: number[]): void => {
  const max = Math.max.apply(Number, array);
  for (let index in array) {
    if (array[index] == max) console.log(index);
  }
};

maxPosition([1, 656, 656, 4]);
