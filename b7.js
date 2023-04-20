var Student = /** @class */ (function () {
    function Student(lastName, firstName, age, address) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.address = address;
    }
    Student.prototype.goToSchool = function (action) {
        console.log(action);
    };
    Student.prototype.goToWork = function (action) {
        console.log(action);
    };
    return Student;
}());
var studentOne = new Student("Truong", "Hung", 21, "Thai Binh");
studentOne.goToSchool("Di hoc toan");
var studentTwo = new Student("Truong", "Dat", 7, "Thai Binh");
studentTwo.goToSchool("Di hoc van");
