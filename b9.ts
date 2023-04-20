class Employee {
  private id: number;
  private firstName: string;
  private lastName: string;
  private salary: number;

  constructor(id: number, firstName: string, lastName: string, salary: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
  }

  getId(): number {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return this.lastName + " " + this.firstName;
  }

  getSalary(): number {
    return this.salary;
  }

  setSalary(salary: number) {
    this.salary = salary;
  }

  getAnnualSalary(): number {
    return this.salary * 12;
  }

  upToSalary(percent: number): number {
    return this.salary + (this.salary * percent) / 100;
  }
}

const employee = new Employee(1, "Hung", "Truong", 1000000);
console.log(employee.getFullName());
employee.setSalary(17);
console.log(employee.getAnnualSalary());
console.log(employee.upToSalary(10));
