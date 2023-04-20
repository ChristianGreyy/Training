var a = 3;
var b = 4;
var c = 5;
var isTriangle = function (a, b, c) {
    return a + b > c && b + c > a && a + c > b;
};
if (isTriangle(a, b, c)) {
    var p = (a + b + c) / 2;
    var s = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    console.log("Perimeter", p);
    console.log("Area", s);
}
else {
    console.log("No");
}
