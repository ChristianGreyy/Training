"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b18_1 = require("./b18");
var count = 0;
var primeNums = 5;
var index = 0;
while (count < primeNums) {
    if ((0, b18_1.isPrime)(index)) {
        console.log(index);
        count++;
    }
    index++;
}
