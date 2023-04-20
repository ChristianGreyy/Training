var object1 = {
    fullName: "Anonystick",
    occupation: "Software developer",
    age: 31,
    website: "https://anonystick.com",
};
var answerOne = "";
var answerTwo = "";
for (var index in object1) {
    answerOne += "".concat(index, ": ").concat(object1[index], " ");
    answerTwo += "\n    ".concat(index, ": ").concat(object1[index], " \n  ");
}
console.log(answerOne);
console.log(answerTwo);
var keysArray = Object.keys(object1);
var object2 = {};
object2[keysArray[0]] = "TruongHung";
object2[keysArray[1]] = "NodeJS Developer";
console.log(object2);
var object3 = {};
object3[keysArray[0]] = "TruongHung";
object3[keysArray[2]] = 25;
console.log(object3);
