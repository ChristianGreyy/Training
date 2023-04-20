"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterMax = exports.n = void 0;
var characterMax = function (num) {
    var max = 0;
    var array = n.toString().split("");
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        if (max < +item)
            max = +item;
    }
    return max;
};
exports.characterMax = characterMax;
var n = 123;
exports.n = n;
console.log(characterMax(n));
