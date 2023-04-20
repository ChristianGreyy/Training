"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondsTotal = void 0;
var secondsTotal = 7826;
exports.secondsTotal = secondsTotal;
var b6_1 = require("./b6");
var tranferSecondTohour = function (secondsTotal) {
    var hours = Math.floor(secondsTotal / 3600);
    var leftSecond = secondsTotal - hours * 3600;
    var minutes = Math.floor(leftSecond / 60);
    var seconds = leftSecond % 60;
    return "".concat((0, b6_1.formatLowerThanTen)(hours), ":").concat((0, b6_1.formatLowerThanTen)(minutes), ":").concat((0, b6_1.formatLowerThanTen)(seconds));
};
console.log("Bai 7");
console.log(tranferSecondTohour(secondsTotal));
