var maxPosition = function (array) {
    var max = Math.max.apply(Number, array);
    for (var index in array) {
        if (array[index] == max)
            console.log(index);
    }
};
maxPosition([1, 656, 656, 4]);
