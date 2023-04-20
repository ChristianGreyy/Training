// const max = (array: number[], left: number, right: number): number => {
//   if (left == right) return array[left];
//   let mid = (left + right) / 2;
//   let maxLeft: number = max(array, left, mid);
//   let maxRight: number = max(array, mid + 1, right);
//   return maxLeft > maxRight ? maxLeft : maxRight;
// };

const max = (array: number[]): number => {
  let max = 0;
  for (let item of array) {
    max = max < item ? item : max;
  }
  return max;
};

console.log(max([1, 2, 3, 4]));

export { max };
