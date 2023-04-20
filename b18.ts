const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) return false;
  }
  return true;
};

let num: number = 10;
let check: boolean = false;
for (let i = 0; i <= num; i++) {
  if (isPrime(i)) {
    console.log(i);
    check = true;
  }
}

if (!check) console.log("NOT FOUND");

export { isPrime };
