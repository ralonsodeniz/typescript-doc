// Intersection types
// allow us to combine different types
type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};
// to make the intersection type we use the & to combine both
// in the case of object types (and interfaces) the intersection type would be the combination of both
type ElevatedEmployee = Admin & Employee;
const e1: ElevatedEmployee = {
  name: 'Terry',
  privileges: ['create-server'],
  startDate: new Date(),
};
console.log(e1);
// we could have achieve the same with interfaces by using the intersection to create a new type or also the extends pattern to create a new interface
interface Admin1 {
  name: string;
  privileges: string[];
}
interface Employee1 {
  name: string;
  startDate: Date;
}
// Important! in this case we are creating a new type using the interfaces and the intersection
type ElevatedEmployee1 = Admin1 & Employee1;
// the extended interface, remember that, unlike classes, interfaces can extend more than one another interface
interface ElevatedEmployee2 extends Admin1, Employee1 {}
// for other types that are not objects the intersection operator will search for the common type available between the types that are being intersected
type Combinably = string | number;
type Numeric = number | boolean;
// in this case the intersection would be number
type Universal = Combinably & Numeric;

type Booleany = boolean;
type Stringy = string;
// if it doesnt found a common intersection type will be casted as never
type Test = Booleany & Stringy;

// Type guards
// type guards helps us with union types
// !! THIS IS FUNCTION OVERLOAD
// to use function overload we need to use the function declaration instead of function expression
// these four previous definitions of the addGuarded functions is the function overload
function addGuarded(a: number, b: number): number;
function addGuarded(a: string, b: string): string;
function addGuarded(a: number, b: string): string;
function addGuarded(a: string, b: number): string;
function addGuarded(a: Combinably, b: Combinably) {
  return typeof a === 'string' || typeof b === 'string' // this is what we call a type guard, it allows us to use the flexibility of an union type but guarding that the code is correct
    ? a.toString() + b.toString()
    : a + b;
}

type UnknownEmployee = Employee | Admin;
const printEmployee = (employee: UnknownEmployee) => {
  console.log('Name: ' + employee.name);
  if ('privileges' in employee)
    console.log('Privileges: ' + employee.privileges); // this is another way to type guard, in this case we use the pattern "property" in "object"
  if ('startDate' in employee) console.log('Started at: ' + employee.startDate);
};
printEmployee(e1);
// working with classes we have another type guard, instanceof
// instance of will check the instance of the constructor function used to create the object we checking
class Car {
  drive() {
    console.log('driving...');
  }
}
class Truck {
  drive() {
    console.log('driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount);
  }
}
type Vehicle = Car | Truck;
const vehicle1 = new Car();
const vehicle2 = new Truck();
const useVehicle = (vehicle: Vehicle) => {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(34);
};
useVehicle(vehicle1);
useVehicle(vehicle2);

// Discriminated unions
// this is a pattern we can use with union types to make type guards easier
// its available when working with object types
// we add a common property to every interface (or object type if we decide to work with object types) with literal type for each one, in this case "kind" property
interface Bird {
  kind: 'bird';
  flyingSpeed: number;
}
interface Horse {
  kind: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;
const moveAnimal = (animal: Animal) => {
  // now we use a case to select each interface by its kind and do something in every situation
  let speed: number;
  switch (animal.kind) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
    default:
      speed = 0;
  }
  console.log('Moving with speed: ' + speed);
};
const canary: Bird = {
  kind: 'bird',
  flyingSpeed: 10,
};
moveAnimal(canary);

// Type casting
// allows us to tell ts that some value is of an specific type that it cannot detect by itself but we as developer know that is going to be that type
// for example when selecting an element from the DOM
// something to have in mind is that if we select using querySelector or getElementTagName ts identifies the type  but if we select by id for example it does not
// we can cast the type using <> before selecting the element and putting inside the specific type
let userInputElement = <HTMLInputElement>document.getElementById('user-input');
// we also can cast the type using the "as" keyword followed by the specific type after selecting the element
userInputElement = document.getElementById('user-input') as HTMLInputElement;
// now ts knows that userInputElement has a placeholder property we can modify
userInputElement.placeholder = 'Insert text here...';
// if we just want to tell ts we are sure something is not going to be null we use the ! after the assign
// keep in mind that type casting already lets ts know we are sure it would not be null
// userInputElement = document.getElementById('user-input')!
// we can use type casting also inside code if we are not completely sure something is not going to be null
const userInputElement1 = document.getElementById('user-input1');
if (userInputElement1)
  (userInputElement1 as HTMLInputElement).value = 'not null!';

// Index properties
// allows us to create objects more flexible regarding to the properties they can held
// for example we want to have an interface to reflect the structure of on object that is going to contain the error string for each input type we can have in our app
// we want to use this for all the inputs in our application but we want to be flexible with the properties since not every input has to have all the identifiers
// we want an object where we know the type of the properties but we dont know the identifiers or how many we could have
interface ErrorContainer {
  [key: string]: string; // we define an index property with any name and the type the identifier of the property its going to be and followed by the type of the value stored
  // we could then add as much as properties we want to the object using this interface as long as they have a key that is a string and a value stored of string type
  id: string; // we can also define pre defined properties but they have to fulfill the index property type
  // code: number; this is wrong and would throw an error, this is a limitation within the index properties
}
const userError: ErrorContainer = {
  id: 'user',
  email: 'Not a valid email!',
  userName: 'Must start with a capital character!',
  // there is a caveat here where ts can understand numbers as strings so we can use a number as key and ts would treat it as an string, but not otherwise, if we had define the key as number we could not use a string as key
};
console.log(userError);

// Function overloads
// a feature that allows us to define multiple function signatures of the same function
// we can use the add function defined before
const result = addGuarded('John', ' Doe'); // ts infers that the return type is the union type and that's not completely true, in this case is a string
// this is a problem because now, since ts doesn't know whether this is a string or a number it does not allow us to manipulate the result as a string
// result.split(' '); split is not a valid method for the union type even when we know the result is going to be a string
// we could solve this using type casting but it is not the best solution
const result1 = addGuarded('John', ' Doe') as string;
console.log(result1.split(' '));
// this is where function overload can help, go to line 46 to check the pattern
// now if we use the addGuarded function again
const result2 = addGuarded(2, 5); // know ts identifies that we are passing 2 numbers and the inferred return type, according to the function overload is a number
const result3 = addGuarded('Hello ', 'World');
console.log(result2);
console.log(result3.split(' '));

// Optional chaining
// we use optional chaining when we are not sure if a certain property of an object is defined
// imagine fetchUserData is the response of an api that may or not have the job property
const fetchedUserData = {
  id: 'u1',
  name: 'Reynolds',
  // job: {
  //   title: 'CEO',
  //   description: 'Chairmen of the company',
  // }
}
// we can use optional chaining "?" to check only if it exists and if not to return undefined
// console.log(fetchedUserData?.job?.title); // this will throw an error in this case because ts knows that job is not there since this is not an api response but this is the idea

// Nullish coalescing
// help us to deal with nullish data, when we are not sure if something if is undefined null or valid data
// imaging again getting a response from an api
const userInputNullish = null;
// we would like to have a backup value if the response is nullish
// we could use or logical operator
const storedData = userInputNullish || 'DEFAULT';
// the problem here is that the or operator checks falsy not nullish so 0, false, empty string, etc... will trigger the backup value
// for the nullish coalescing, only get backup value if null or undefined we use "??"
const storedDataNullish = userInputNullish ?? 'DEFAULT';
