let options = {
  size: {
    width: 100,
    height: 200,
  },
  items: ["Cake", "Donut"],
  extra: true,
};

const { width, height } = options.size;
const [item1, item2] = options.items;

console.log(width, height, item1, item2);
