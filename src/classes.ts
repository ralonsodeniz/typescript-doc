// Classes
class Department {
  // this is field declarations not supported in es6 or older
  // properties defined here are public unless we define them as private
  // public properties can be accessed from outside the class, which is not always a good thing
  // to make them private you add the keyword private before the key
  // you can also mark methods as private
  readonly name: string;
  // we can give initial values to properties declared in the field declarations
  private employees: string[] = [];
  // static properties can be accessed directly from the class without the need to instantiate it first
  static fiscalYear = 2021;
  // the constructor is an utility function that initializes the object
  constructor(name: string, employees: string[] = []) {
    this.name = name;
    this.employees = employees;
  }
  // class methods are defined before the constructor
  // typescript adds a layer of security for class methods so they cannot be extracted from the class and executed out of its context
  // we do this by passing "this" as method parameter and assigning it the class as type
  // this has to be always the first parameter if we have another parameters and it would be "ignored" when passing down arguments to the method call
  describe(this: Department) {
    // to refer to the class name property we need to refer to this.name otherwise it will refer to a global scoped name if exists
    // if you want to refer to a method defined inside the class it would be the same
    console.log(`Department: ${this.name}`);
  }
  addEmployee(this: Department, employee: string) {
    this.employees = [...this.employees, employee];
  }
  printEmployeesInformation(this: Department) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
  // static keyword allows this method to be invoked directly from the class (Department.createEmployee) without the need of instantiate it first
  static createEmployee(name: string) {
    return { name };
  }
}

const accounting = new Department('Accounting', ['Doe']);
accounting.describe();
accounting.addEmployee('John');
accounting.printEmployeesInformation();
console.log(accounting.name);
// if we try to do next, extract describe from accounting and passing it to accounting copy when we try to execute describe from accountingCopy context typescript throws an error
// const accountingCopy = {describe: accounting.describe}
// accountingCopy.describe();
// if we add a name property to accountingCopy then ts will allow us to execute describe method since now accountCopy has the same structure as Department class

// Shorthand initialization
// in the previous example we have redundant code where we first declare some properties in the field declarations that then have their value reassigned witch values from constructor parameters in the initialization
// in this case, public cannot be omited as in the standard definition as default value, we have to explicitly say if it is public
// we can shorthand this initialization declaring the definition of the parameters in the constructor params like this
abstract class ShorthandDepartment {
  // private employees: string[] = []; // defining this as private makes it inaccessible even in a class that extends this one, it would happen the same to methods defined as private
  // if we want to have the advantages of private definition but we still want to be able to access them from classes that extend this one we use the keyword protected
  protected employees: string[] = [];
  // abstract classes constructor can be marked as protected
  protected constructor(
    public readonly name: string,
    protected readonly id: number,
  ) {} // doing this typescript understand that we are going to have 2 properties with the same name as the inputs and their definition set as private
  // readonly keyword ensures that this property can only have its value assigned at the property initialization
  abstract describe(this: ShorthandDepartment): void; // abstract methods dont have curly bracers and have to define the return type expected
  // console.log(`Department (${this.id}): ${this.name} `);
  addEmployee(this: ShorthandDepartment, employee: string) {
    this.employees = [...this.employees, employee];
  }
  printEmployeesInformation(this: ShorthandDepartment) {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// Inheritance
// we can create classes that extends another classes an inherit their properties and methods while adding new ones
// we can only inherit from one class at a time
class ITDepartment extends ShorthandDepartment {
  // private employees: string[] = [];
  constructor(id: number, private admin: string) {
    // in this case we dont need to shorthand declare id since we are not using it in the ITDepartment class but only to pass it to the class we are extending
    // super keyword allows us to pass values to the constructor of the class we are extending
    super('IT', id); // in this case the name is always going to be a fixed value since we are creating an specific department
    // super has to be called inside the constructor before we do anything with the this keyword
  }
  printAdmin(this: ITDepartment) {
    console.log(this.admin);
  }
  changeAdmin(this: ITDepartment, admin: string) {
    this.admin = admin;
  }
  // we can override properties and methods inherit from the extended class
  addEmployee(this: ITDepartment, employee: string) {
    if (employee === 'Tete') return;
    this.employees = [...this.employees, employee];
  }
  // since this extends an abstract class we hve to define the abstract method
  describe(this: ITDepartment) {
    console.log(`${this.name} Department: ID ${this.id}`);
  }
}

const itDep = new ITDepartment(3, 'Leonor');
// extended classes has access to the public properties and methods of the class that is extended
itDep.describe();
itDep.printAdmin();
itDep.printEmployeesInformation();
itDep.changeAdmin('Leon');
itDep.addEmployee('Rex');
itDep.addEmployee('Tete');
itDep.printAdmin();
console.log(itDep);

// Getters and setters
// getters allow us to access indirectly to the value of private properties
class AccountingDepartment extends ShorthandDepartment {
  private lastReport: string;
  // we declare the getter in the definition
  get mostRecentReport() {
    // getters have always to return something
    if (this.lastReport) return this.lastReport;
    throw new Error('No report found');
  }
  // we declare the setter in the definition
  // it can be named the same as the getter
  set mostRecentReport(value: string) {
    // setters do not return a value
    if (!value) throw new Error('Invalid value');
    // setters can use methods from the class (or the extended class)
    this.addReport(value);
  }
  // we need to create a static property with the type of the own class to then generate the singleton instance
  private static instance: AccountingDepartment;
  // making the constructor private we convert the class in a singleton class
  private constructor(id: number, private reports: string[] = []) {
    super('Accounting', id);
    this.lastReport = reports[reports.length - 1];
  }
  addEmployee(this: AccountingDepartment, employee: string) {
    if (employee === 'Peter') return;
    this.employees = [...this.employees, employee];
  }
  addReport(this: AccountingDepartment, text: string) {
    this.reports = [...this.reports, text];
    this.lastReport = text;
  }
  printReports(this: AccountingDepartment) {
    console.log(this.reports);
  }
  // since this extends an abstract class we hve to define the abstract method
  describe(this: AccountingDepartment) {
    console.log(`${this.name} Department: ID ${this.id}`);
  }
  // we create an static method to create the singleton instance by using the private static property instance previously defined
  static getInstance() {
    // if the instance already exists we return it
    if (this.instance) return this.instance;
    // if it does not exist we create the new instance. Since we are INSIDE the class we can use here the new keyword because we can use the private constructor from within the class
    this.instance = new AccountingDepartment(4, ['Initial report']);
    return this.instance;
  }
}

// const ACDepartment = new AccountingDepartment(4, ['Initial report']); we cannot create an instance like this anymore since AccountingDepartment is now a singleton class
const ACDepartment = AccountingDepartment.getInstance(); // this is the way to create the unique instance of the singleton class.
// unlike methods, when we invoke the getter we dont have to make a function execution, we access it like a property
console.log(ACDepartment.mostRecentReport);
ACDepartment.addReport('First report');
console.log(ACDepartment.mostRecentReport);
// now we can use the setter to add las report
// again we do not trigger it as a method but we assign it a value, which will trigger the setter method in this case
ACDepartment.mostRecentReport = 'Last report';
console.log(ACDepartment.mostRecentReport);
ACDepartment.printReports();

// Static methods and properties
// statics methods and properties are methods and properties you can access from a class without creating an instance of the class
// for example Math methods and properties such Math.PI to access pi number value or Math.pow() to calculate the pow of a number
// go to Department definition to see an example of an static method createEmployee and property fiscalYear
// IMPORTANT static properties and methods are not available in non static methods of the class since "this" is created from the instance and static properties and methods are outside of that context
// if you need to access them you have to access using the class definition, using Department.fiscalYear instead of this.fiscalYear
// accounting.fiscalYear is not accessible for example
const employee1 = Department.createEmployee('Rudolph');
console.log(employee1);
console.log(Department.fiscalYear);

// Abstract classes
// we use the abstract keyword in a method when we know that every class that extends the base class will need that method but we are unable to create a generic method for every possible extension
// with abstract we make the developers to define the custom version of that method for every class that extends the original class
// abstract methods have to be empty methods where we only define the parameters
// any class with one or more abstract methods have to have the abstract keyword in the class definition too
// IMPORTANT you cannot create instances of abstract classes. This is logic because abstract classes have not defined methods because they are thought to be extended by other classes
// go to ShorthandDepartment for an example with describe

// Singletons and private constructors
// this is a pattern that ensures that we can only create one object out of a class
// for example with accounting department we only want it to have one instance since there is only one accounting department
// to enforce this we can turn the constructor in a private constructor
// now this prevents us from instantiating the class and we have to apply the singleton pattern to get the instance
// to do this we need to use the static methods and keywords that we saw before
// IMPORTANT when we use "this" inside a static method we access the class properties and methods not the instanced ones
