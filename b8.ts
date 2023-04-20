const max = (...nums: number[]): number => {
  let max = 0;
  for (let num of nums) {
    if (max < num) max = num;
  }

  return max;
};

let a: number = 10;
let b: number = 20;

console.log(max(a, b));

export { a, b, max };
