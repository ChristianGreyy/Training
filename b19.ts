import { isPrime } from "./b18";

let k: number = 10;
let average: number = 0;
let nums: number = 0;

for (let i = 0; i <= k; i++) {
  if (isPrime(i)) {
    average += i;
    nums++;
  }
}

console.log("average", (average / nums).toFixed(3));
