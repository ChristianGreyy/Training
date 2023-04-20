var Circle = /** @class */ (function () {
    function Circle(radius, color) {
        this.radius = 1;
        this.color = "red";
        if (radius) {
            this.radius = radius;
        }
        if (color) {
            this.color = color;
        }
    }
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    Circle.prototype.setRadius = function (value) {
        this.radius = value;
    };
    Circle.prototype.getColor = function () {
        return this.color;
    };
    Circle.prototype.setColor = function (value) {
        this.color = value;
    };
    Circle.prototype.getArea = function () {
        return Math.PI * Math.pow(this.radius, 2);
    };
    Circle.prototype.toString = function () {
        console.log("\n        radius: ".concat(this.radius, "\n        color: ").concat(this.color, "\n    "));
    };
    return Circle;
}());
var circle1 = new Circle();
var circle2 = new Circle(17);
var circle3 = new Circle(10, "black");
circle1.toString();
console.log(circle1.getArea());
circle2.toString();
console.log(circle2.getArea());
circle3.toString();
console.log(circle3.getArea());
