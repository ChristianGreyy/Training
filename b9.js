var Employee = /** @class */ (function () {
    function Employee(id, firstName, lastName, salary) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
    }
    Employee.prototype.getId = function () {
        return this.id;
    };
    Employee.prototype.getFirstName = function () {
        return this.firstName;
    };
    Employee.prototype.getLastName = function () {
        return this.lastName;
    };
    Employee.prototype.getFullName = function () {
        return this.lastName + " " + this.firstName;
    };
    Employee.prototype.getSalary = function () {
        return this.salary;
    };
    Employee.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Employee.prototype.getAnnualSalary = function () {
        return this.salary * 12;
    };
    Employee.prototype.upToSalary = function (percent) {
        return this.salary + (this.salary * percent) / 100;
    };
    return Employee;
}());
var employee = new Employee(1, "Hung", "Truong", 1000000);
console.log(employee.getFullName());
employee.setSalary(17);
console.log(employee.getAnnualSalary());
console.log(employee.upToSalary(10));
