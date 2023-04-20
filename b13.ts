const fibonacci = (n: number): number => {
  if (n == 1 || n == 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(1));
console.log(fibonacci(2));
