const object1 = {
  fullName: "Anonystick",
  occupation: "Software developer",
  age: 31,
  website: "https://anonystick.com",
};

let answerOne = "";
let answerTwo = "";
for (let index in object1) {
  answerOne += `${index}: ${object1[index]} `;
  answerTwo += `
    ${index}: ${object1[index]} 
  `;
}

console.log(answerOne);
console.log(answerTwo);

let keysArray: string[] = Object.keys(object1);

const object2: {} = {};

object2[keysArray[0]] = "TruongHung";
object2[keysArray[1]] = "NodeJS Developer";
console.log(object2);

const object3: {} = {};
object3[keysArray[0]] = "TruongHung";
object3[keysArray[2]] = 25;
console.log(object3);
