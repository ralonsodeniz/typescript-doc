// INTERFACES
// an interface describes the structure of an object, how an object looks like
// we use the interface keyword
// interfaces cannot have a default value
// interfaces only accept readonly keyword to declare that the parameter is assigned its value only when the object / class is initialized and cannot be changed after
interface Greetable {
  readonly name: string;
  // we describe the parameters and the return type
  // for methods we use also a pattern like when we described the abstract methods for classes
  greet(message: string): void;
}
// we can now use this to type check an object using our interface as type
// we can tell ts that empty user1 is going to be Person interface type
// CAREFUL with this because it allows us to call for the method defined in Person but if we do not add the method in user1 it will throw a runtime error
const user1 = {
  name: 'Randolph',
} as Greetable;
// user1.hobbies = ['run', 'red']; if we try to add a property that does not exist in the Person interface it will give us an error
// user1.name = 'Randolph'; this would give a ts error since name is tagged as readonly and the object has been already initialized
console.log(user1);
// we can explicitly set user 2 type to Person interface / usually we do like this
const user2: Greetable = {
  name: 'Teo',
  // we dont really need to define message type since it is inferred by ts according to Person definition
  greet(message: string) {
    console.log(`${message} ${this.name}`);
  },
};
console.log(user2);
user2.greet('Hello');

// using interfaces with classes
// whats the difference with interfaces and custom types
// interfaces can only be used to describe the structure of an object while custom types can do that but also to describe other things like union types
// Interfaces are clearer and when you see them you know the structure of an object is going to be described
// you can implement interfaces with classes. You can use it as a contract that a class has to fulfill
// you can implement multiple interfaces by separating them with a coma
// we can do this with the following code
class Person implements Greetable {
  constructor(readonly name: string, public age: number) {}
  greet(message: string) {
    console.log(`${message} ${this.name}`);
  }
  // classes that implement an Interface can have another properties or methods not just the ones from the interface / interfaces implemented
  farewell(message: string) {
    console.log(`${message} ${this.name} ${this.age}`);
  }
}
// Interfaces are similar to abstract classes but in the interface we do not have any kind of implementation like we could have in an abstract class
const user3 = new Person('Jenny', 30);
user3.farewell('Bye bye');
// we can define user4 type as Greetable and then create it using Person class and it would be ok since Person implements Greetable so the type checking is correct
let user4: Greetable;
// we do not care if user4 has more things than what Greetable contract enforces, we only want to be sure it has a name property and a greet method
user4 = new Person('Rachel', 24);

// Extending interfaces
// we can also implement inheritance in interfaces using extends keyword
// On the contrary that it happens to classes, with interfaces we can extend more than one interface
interface Named {
  readonly name: string;
}
interface NewGreetable extends Named {
  greet(message: string): void;
}

class Person1 implements NewGreetable {
  constructor(readonly name: string) {}
  greet(message: string) {
    console.log(message);
  }
}

const user5: NewGreetable = new Person1('Sophie');
console.log(user5);

// Interfaces as function types
// we define it similar to the method we defined for the object interface before but in this case we define it as a anonymous function, we do not add a name for it
// for function types it may be better the function type definition instead the interfaces
type AddFnType = (a: number, b: number) => number; // this would be the function type definition
// this is the interface as function type
interface AddFn {
  (a: number, b: number): number;
}
const addFn: AddFn = (a: number, b: number) => a + b;

// Optional parameters and properties
// in the interfaces for objects we can define optional parameters for objects and classes
// this way we do not force all the classes that implements the interface to have those properties
// this can be done also for methods
// for this we use the ? after the property or method name
interface Named1 {
  readonly name?: string;
  outputName?: string;
}
// this optional mark can be used also in classes without using interfaces
class Person2 implements Named1 {
  constructor(readonly name?: string) {}
}
// we cannot pass name parameter and its ok because its marked as optional
const user6: Named1 = new Person2();
console.log(user6);
// we can also make a property optional if we pass it a default value
