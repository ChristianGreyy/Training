let secondsTotal: number = 7826;

import { formatLowerThanTen } from "./b6";

const tranferSecondTohour = (secondsTotal: number): string => {
  let hours: number = Math.floor(secondsTotal / 3600);
  let leftSecond: number = secondsTotal - hours * 3600;
  let minutes = Math.floor(leftSecond / 60);
  let seconds = leftSecond % 60;

  return `${formatLowerThanTen(hours)}:${formatLowerThanTen(
    minutes
  )}:${formatLowerThanTen(seconds)}`;
};

console.log(tranferSecondTohour(secondsTotal));

export { secondsTotal };
