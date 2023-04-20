let a: number = 5;
let b: number = 11;
let c: number = 2018;

const formatLowerThanTen = (num: number): string => {
  return num < 10 ? "0" + num.toString() : num.toString();
};

const formatToDate = (a: number, b: number, c: number): string => {
  return `${formatLowerThanTen(a)}/${formatLowerThanTen(b)}/${c}`;
};

console.log(formatToDate(a, b, c));

export { a, b, c, formatLowerThanTen };
