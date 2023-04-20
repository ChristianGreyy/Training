"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b18_1 = require("./b18");
var k = 10;
var average = 0;
var nums = 0;
for (var i = 0; i <= k; i++) {
    if ((0, b18_1.isPrime)(i)) {
        average += i;
        nums++;
    }
}
console.log("average", (average / nums).toFixed(3));
