let a: number = 3;
let b: number = 4;
let c: number = 5;

const isTriangle = (a: number, b: number, c: number): boolean => {
  return a + b > c && b + c > a && a + c > b;
};

if (isTriangle(a, b, c)) {
  let p: number = (a + b + c) / 2;
  let s: number = Math.sqrt(p * (p - a) * (p - b) * (p - c));
  console.log("Perimeter", p);
  console.log("Area", s);
} else {
  console.log("No");
}
