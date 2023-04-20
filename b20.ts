import { isPrime } from "./b18";

let count: number = 0;
let primeNums: number = 5;
let index: number = 0;
while (count < primeNums) {
  if (isPrime(index)) {
    console.log(index);
    count++;
  }
  index++;
}
