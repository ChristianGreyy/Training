var people = {
    Dung: 25,
    TuanAnh: 24,
    TruongHung: 21,
};
var topAge = function (people) {
    if (Object.keys(people).length == 0)
        return null;
    var maxObject = {
        max: 0,
        name: "",
    };
    for (var index in people) {
        if (maxObject.max < people[index]) {
            maxObject.max = people[index];
            maxObject.name = index;
        }
    }
    console.log(maxObject.name);
};
topAge(people);
