// const max = (array: number[], left: number, right: number): number => {
//   if (left == right) return array[left];
//   let mid = (left + right) / 2;
//   let maxLeft: number = max(array, left, mid);
//   let maxRight: number = max(array, mid + 1, right);
//   return maxLeft > maxRight ? maxLeft : maxRight;
// };
var max = function (array) {
    var max = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        max = max < item ? item : max;
    }
    return max;
};
console.log(max([1, 2, 3, 4]));
