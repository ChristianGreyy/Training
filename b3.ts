const average = (...array: number[]): number => {
  let sum = 0;
  for (let item of array) {
    sum += item;
  }
  return sum / array.length;
};

const rain: number[] = [1, 3, 2];

let averageRain = average(...rain);

for (let index in rain) {
  if (rain[index] > averageRain) console.log(+index + 1);
}
