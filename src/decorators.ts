// Decorators
// decorators are all about classes
// a decorator is a function that applies to something and modifies it
// as an special thing decorator functions starts with a capital letter
// when we want to use a decorator targeting a class we need to have one parameter, the class constructor function
// the type is Function but to make it universal we use a generic function
// it can be used to observe, modify, or replace a class definition.
// function Logger() {
//   console.log('Logging...');
// }
interface IGenObject<T> {
  [key: string]: T;
}
const Logger = <T extends { new (...args: any[]): IGenObject<any> }>(
  constructor: T,
) => {
  console.log('Logging...');
  console.log(constructor);
};
// to add it as decorator to a class we use @
// keep in mind that we just put the decorator function definition, not execution
// the decorator is applied to the class definition not the instance creation
@Logger
class Person3 {
  name = 'Terry';
  constructor() {
    console.log('Creating person object');
  }
}
const person1 = new Person3();
console.log(person1);
// decorator executes when the class is defined not instantiated

// Decorator factories
// decorator factories can take parameters and then use them in the decorator definition
// function LoggerFactory(message: string) {
//   return function <T extends { new (...args: any[]): {} }>(constructor: T) {
//     console.log(message);
//     console.log(constructor);
//   };
// }
const LoggerFactory = (message: string) => <
  T extends { new (...args: any[]): IGenObject<any> }
>(
  // when we know we are going to get an argument but we are not interested on it (in this case class decorators always get the constructor function) we can define it as "_" and let ts know we dont care about it
  _: T,
) => {
  console.log(`Logging: ${message}`);
};
// now to use a decorator factory we need to pass the arguments to the external function in the currying
// and it will return the decorator function that is applied to the class with the info we have passed down through the arguments of the decorator factory
@LoggerFactory('Logging factory!')
class Person4 {
  name = 'Joe';
  constructor() {
    console.log('Creating person object');
  }
}
const person2 = new Person4();
console.log(person2);

// Another decorator example
const WithTemplate = (template: string, hookId: string) => <
  T extends { new (...args: any[]): IGenObject<any> }
>(
  constructor: T,
) => {
  console.log('Rendering template...');
  const hookEl = document.getElementById(hookId);
  // we have access to the constructor so we could create an instance
  const instance = new constructor();
  if (hookEl) {
    hookEl.innerHTML = template;
    const h1 = hookEl.querySelector('h1');
    if (h1)
      h1.appendChild(
        document.createElement('span'),
      ).innerText = `, ${instance.name}`;
  }
  // we can even extend the constructor and modify it overriding properties or methods or defining new ones
  return class extends constructor {
    test = 'test string';
  };
};
@WithTemplate('<h1>My person object</h1>', 'template-test')
class Person5 {
  name = 'Minari';
  constructor() {
    console.log('Creating person object');
  }
}
const person3 = new Person5();
console.log(person3);

// Adding multiple decorators
// we can add more than one decorator
@LoggerFactory('Hello World')
@WithTemplate('<h1>My person object</h1>', 'template-test')
class Person6 {
  name = 'Minari';
  constructor() {}
}
const person4 = new Person6();
console.log(person4);
// decorators execute from bot to top. IMPORTANT, the decorators not the decorators factories, factories execute in normal order from top to bot
// console.log(person4.test); this would throw a ts error because decorators do not modify ts class type definition

// Property decorators
// property decorators receive 2 arguments,
// first one is either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// second is the property key of the member. This can be an string or a Symbol
// the target that for an instance property it would be the prototype of the object that was created and if it were an static property it would be the constructor
// since we dont know exactly the structure of the target object we can set to any or to our default object interface
// the second parameter is the propertyKey that can be an string or Symbol depending what is used as property identifier
type ObjIdentifier = string | number;
// we create our property decorator
const Log = (target: IGenObject<any>, propertyKey: ObjIdentifier) => {
  console.log('Property decorator');
  console.log(target, propertyKey);
};
class Product {
  // we cannot use short declaration with title since we want to add a property decorator
  @Log
  protected title: string;
  // remember setter and getters are called accessors since they give you access to class properties from outside
  set price(value: number) {
    if (value) {
      this._price = value;
    } else throw new Error('invalid price value');
  }
  // the getter/setter cannot have the name that matches the property name
  // the general pattern is to name the internal properties just like a setter/getter only with the edition of an underscore
  constructor(title: string, protected _price: number) {
    this.title = title;
  }
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
// the property decorator gets executed when we define the property inside the class definition

// Accessors and parameter decorators
// accessors decorators (as well as method decorators) receive 3 arguments
// first one is either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// second is the name of the member.
// third is the Property Descriptor for the member.
const Log2 = (
  target: IGenObject<any>,
  name: string,
  descriptor: PropertyDescriptor,
) => {
  console.log('Accessor decorator');
  console.log('target', target);
  console.log('name', name);
  console.log('descriptor', descriptor);
};
const Log3 = (
  target: IGenObject<any>,
  name: string,
  descriptor: PropertyDescriptor,
) => {
  console.log('Method decorator');
  console.log('target', target);
  console.log('name', name);
  console.log('descriptor', descriptor);
};
// parameter decorator gets three arguments
// first one is either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// second is the property key of the member. This can be an string or a Symbol or a number. the name of the method where the parameter is used.
// third one is the ordinal index of the parameter in the function’s parameter list.
// a parameter decorator can only be used to observe that a parameter has been declared on a method.
const Log4 = (
  target: IGenObject<any>,
  propertyKey: ObjIdentifier,
  index: number,
) => {
  console.log('Parameter decorator');
  console.log('target', target);
  console.log('propertyKey', propertyKey);
  console.log('index', index);
};
class Product1 {
  protected title: string;
  @Log2
  set price(value: number) {
    if (value) {
      this._price = value;
    } else throw new Error('invalid price value');
  }
  constructor(title: string, protected _price: number) {
    this.title = title;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// Returning and changing a Class in a Class decorator
// we can extend the constructor and modify it overriding properties or methods or defining new ones using a return expression in class decorators
const WithTemplate1 = (template: string, hookId: string) => <
  T extends { new (...args: any[]): IGenObject<any> }
>(
  originalConstructor: T,
) => {
  // this is the syntax to return a new constructor based on the original one
  // by extending the originalConstructor (remember this is syntax sugar for the class) we dont lose the original constructor functionalities
  return class extends originalConstructor {
    // when creating the new constructor we have to accept the rest array
    // if we dont need the rest array we can just do (..._: any[])
    constructor(...rest: any[]) {
      // we can pass the rest array to the super so the extended class has access to the arguments
      super(...rest);
      // we can move the logic that attaches the elements to the document to a new constructor so it is only attached when the class is instantiated since we are returning an extended class from the original one
      const hookEl = document.getElementById(hookId);
      // we have access to the constructor so we could create an instance
      if (hookEl) {
        hookEl.innerHTML = template;
        const h1 = hookEl.querySelector('h1');
        if (h1)
          h1.appendChild(
            document.createElement('span'),
            // we can access now the this of the instance we are creating since this code is going to be executed when the instance creates
          ).innerText = `, ${this.name}`;
      }
    }
  };
};
@WithTemplate1('<h1>My person object</h1>', 'template-test')
class Person7 {
  name = 'Leonor';
  constructor() {}
}
const person7 = new Person7();

// Other decorator return types
// apart from classes decorators, you can return from methods and accessors decorators
// in both of them we can return a new PropertyDescriptor
// the descriptor is a js thing, is the detailed definition of the method or the accessor
// in the method descriptor value is the function
// in the accessor descriptor we have the set and the get properties
// Autobind decorator for methods
const Autobind = (
  _: IGenObject<any>,
  _2: ObjIdentifier,
  descriptor: PropertyDescriptor,
) => {
  // the descriptor.value holds the original function
  // we strip the writable property because it will cause an error if we try to set writable and an accessor at the same time
  const { value: originalMethod, writable: _3, ...restDesc } = descriptor;
  // we create the new property descriptor object to be returned
  const newDescriptor: PropertyDescriptor = {
    ...restDesc,
    // the trick is to convert it to an get accessor that would return a bound instance of the original method when we call it
    // it gets bound because when we return it from the get it is called within the instance context
    // we used to add extra logic inside the instance context before the value is returned
    get() {
      return originalMethod.bind(this);
    },
  };
  return newDescriptor;
};
class Printer {
  message = 'This works';

  @Autobind
  showMessage(message: string) {
    console.log(`${this.message} ${message}`);
  }
}
const printer = new Printer();
console.log(printer);
const clickButton = document.querySelectorAll('button')[1]!;
// in the event listener "this" will refer to the target of the event, we are passing as a callback the printers show message
// addEventListener binds this inside showMessage to the target of the event as context so it does not have the same context than in the Printer instance printer
clickButton.addEventListener('click', () => printer.showMessage('hello'));

// Validation with decorators
type ValidatorOption = 'required' | 'positive' | 'min-length';
interface ValidatorConfig {
  [key: string]: ValidatorOption[];
}
class Validator {
  private _validationConfig: ValidatorConfig = {};
  get validatorConfig() {
    return this._validationConfig;
  }
  constructor() {}
  addValidator(input: ObjIdentifier, type: ValidatorOption) {
    this._validationConfig[input] = this._validationConfig[input]
      ? this._validationConfig[input].some(
          (validator: ValidatorOption) => validator === type,
        )
        ? [...this._validationConfig[input]]
        : [...this._validationConfig[input], type]
      : [type];
  }
}
const validator = new Validator();
const Required = (validator: Validator) => (
  _: IGenObject<any>,
  propertyKey: ObjIdentifier,
) => {
  validator.addValidator(propertyKey, 'required');
};
const Positive = (validator: Validator) => (
  _: IGenObject<any>,
  propertyKey: ObjIdentifier,
) => {
  validator.addValidator(propertyKey, 'positive');
};
const MinLength = (validator: Validator) => (
  _: IGenObject<any>,
  propertyKey: ObjIdentifier,
) => {
  validator.addValidator(propertyKey, 'min-length');
};
const validate = (obj: IGenObject<any>, validatorConfig: IGenObject<any>) =>
  Object.entries(validatorConfig).every(([input, types]) =>
    types.every(
      (type: ValidatorOption) =>
        (type === 'required' && obj[input]) ||
        (type === 'positive' && obj[input] > 0) ||
        (type === 'min-length' && obj[input].length > 4),
    ),
  );
class Course {
  // we dont use shortcut because we want to validate the data we get with decorators
  @Required(validator) @MinLength(validator) title: string;
  @Positive(validator) price: number;
  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value; // + will convert the string to a number
  const createdCourse = new Course(title, price);
  if (!validate(createdCourse, validator.validatorConfig)) {
    alert('please insert valid parameters')
  } else {
    console.log(createdCourse)
    console.log(validator)
  };
});
