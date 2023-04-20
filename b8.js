"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max = exports.b = exports.a = void 0;
var max = function () {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var max = 0;
    for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
        var num = nums_1[_a];
        if (max < num)
            max = num;
    }
    return max;
};
exports.max = max;
var a = 10;
exports.a = a;
var b = 20;
exports.b = b;
console.log(max(a, b));
