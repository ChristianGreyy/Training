var average = function () {
    var array = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        array[_i] = arguments[_i];
    }
    var sum = 0;
    for (var _a = 0, array_1 = array; _a < array_1.length; _a++) {
        var item = array_1[_a];
        sum += item;
    }
    return sum / array.length;
};
var rain = [1, 3, 2];
var averageRain = average.apply(void 0, rain);
for (var index in rain) {
    if (rain[index] > averageRain)
        console.log(+index + 1);
}
