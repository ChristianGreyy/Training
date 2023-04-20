const reverse = (n: number): string => {
  return n.toString().split("").reverse().join("");
};

console.log(reverse(123));
