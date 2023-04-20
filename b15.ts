const characterMax = (num: number): number => {
  let max = 0;
  let array: string[] = n.toString().split("");
  for (let item of array) {
    if (max < +item) max = +item;
  }

  return max;
};

let n: number = 123;
console.log(characterMax(n));

export { n, characterMax };
