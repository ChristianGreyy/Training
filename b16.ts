const characterSum = (num: number): number => {
  let sum = 0;
  let array: string[] = n.toString().split("");
  for (let item of array) {
    sum += +item;
  }

  return sum;
};

let n: number = 123;
console.log(characterSum(n));

export { n, characterSum };
