interface IStudent {
  lastName: string;
  firstName: string;
  age: number;
  address: string;
}

class Student {
  private lastName: string;
  private firstName: string;
  private age: number;
  private address: string;
  constructor(
    lastName: string,
    firstName: string,
    age: number,
    address: string
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.age = age;
    this.address = address;
  }

  goToSchool(action: string) {
    console.log(action);
  }

  goToWork(action: string) {
    console.log(action);
  }
}

const studentOne = new Student("Truong", "Hung", 21, "Thai Binh");
studentOne.goToSchool("Di hoc toan");
const studentTwo = new Student("Truong", "Dat", 7, "Thai Binh");
studentTwo.goToSchool("Di hoc van");
