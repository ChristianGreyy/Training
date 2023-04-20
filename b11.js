"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.month = void 0;
var daysNumberOfMonth = function (month) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            console.log("31");
            return;
        case 4:
        case 6:
        case 9:
        case 11:
            console.log("30");
            return;
        case 2:
            console.log("28");
            break;
        default:
            console.log("NOT FOUND");
            break;
    }
};
var month = 2;
exports.month = month;
daysNumberOfMonth(month);
