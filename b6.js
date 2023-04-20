"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLowerThanTen = exports.c = exports.b = exports.a = void 0;
var a = 5;
exports.a = a;
var b = 11;
exports.b = b;
var c = 2018;
exports.c = c;
var formatLowerThanTen = function (num) {
    return num < 10 ? "0" + num.toString() : num.toString();
};
exports.formatLowerThanTen = formatLowerThanTen;
var formatToDate = function (a, b, c) {
    return "".concat(formatLowerThanTen(a), "/").concat(formatLowerThanTen(b), "/").concat(c);
};
console.log(formatToDate(a, b, c));
