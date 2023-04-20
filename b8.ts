class Circle {
  private radius: number = 1;
  private color: string = "red";

  constructor(radius?: number, color?: string) {
    if (radius) {
      this.radius = radius;
    }
    if (color) {
      this.color = color;
    }
  }

  getRadius(): number {
    return this.radius;
  }

  setRadius(value: number) {
    this.radius = value;
  }

  getColor(): string {
    return this.color;
  }

  setColor(value: string) {
    this.color = value;
  }

  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }

  toString() {
    console.log(`
        radius: ${this.radius}
        color: ${this.color}
    `);
  }
}

const circle1 = new Circle();
const circle2 = new Circle(17);
const circle3 = new Circle(10, "black");
circle1.toString();
console.log(circle1.getArea());
circle2.toString();
console.log(circle2.getArea());
circle3.toString();
console.log(circle3.getArea());
