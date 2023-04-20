const phoneMoney = (minutes: number): number => {
  let money: number = 25000;
  if (minutes > 200) {
    return money + (minutes - 200) * 200 + 150 * 400 + 50 * 600;
  }
  if (minutes > 150) {
    return money + (minutes - 50) * 400 + 50 * 600;
  }
  return money + minutes * 600;
};

console.log(phoneMoney(300));
