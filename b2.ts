let a: number = 10;
let b: number = 5;

const sum = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const multiply = (a: number, b: number): number => a * b;
const division = (a: number, b: number): number => a / b;

console.log(sum(a, b));
console.log(subtract(a, b));
console.log(multiply(a, b));
console.log(division(a, b));

export { a, b };
