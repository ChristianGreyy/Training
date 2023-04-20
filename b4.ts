interface IPeople {
  Dung: number;
  TuanAnh: number;
  TruongHung: number;
}

let people = {
  Dung: 25,
  TuanAnh: 24,
  TruongHung: 21,
};

const topAge = (people: IPeople): any => {
  if (Object.keys(people).length == 0) return null;
  let maxObject: { max: number; name: string } = {
    max: 0,
    name: "",
  };
  for (let index in people) {
    if (maxObject.max < people[index]) {
      maxObject.max = people[index];
      maxObject.name = index;
    }
  }
  console.log(maxObject.name);
};

topAge(people);
