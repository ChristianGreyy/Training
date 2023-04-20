"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterSum = exports.n = void 0;
var characterSum = function (num) {
    var sum = 0;
    var array = n.toString().split("");
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        sum += +item;
    }
    return sum;
};
exports.characterSum = characterSum;
var n = 123;
exports.n = n;
console.log(characterSum(n));
