"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrime = void 0;
var isPrime = function (n) {
    if (n < 2)
        return false;
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0)
            return false;
    }
    return true;
};
exports.isPrime = isPrime;
var num = 10;
var check = false;
for (var i = 0; i <= num; i++) {
    if (isPrime(i)) {
        console.log(i);
        check = true;
    }
}
if (!check)
    console.log("NOT FOUND");
