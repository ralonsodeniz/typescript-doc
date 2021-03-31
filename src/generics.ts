// Built in generics types
// A generic type is a type which is kind of connected with some another type and its flexible regarding which exact type is that other type
// generic types has the form of Type<type connected>
// for example Array is a built in generic type, it needs at least one type of what it will be storing
const names: Array<string> = ['Ron', 'Peter']; // this is the same as const names: string[] = ['Ron', 'Peter'];
// By knowing the associated type to the generic type we can get support from typescript with the methods that associated type accepts, in this case string methods
console.log(names[0].split(''));
// Another built in generic type is Promises type
const promise: Promise<string> = new Promise(resolve => {
  setTimeout(() => resolve('this is done'), 2000);
});
promise.then(data => console.log(data));

// Generic function
// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }
const merge = (objA: object, objB: object) => Object.assign(objA, objB);
const mergedObj = merge({ name: 'Henry' }, { age: 34 });
// problem here is that ts cannot know which properties has the resulting object from the merge
// console.log(mergedObj.age); // this throws a ts error, Property 'age' does not exist on type 'object'
// we could do type casting and create an interface with the structure of the resulting object and casting that interface to the resulting object
interface IMergedObj {
  name: string;
  age: number;
}
const mergedObj1 = merge({ name: 'Hilary' }, { age: 42 }) as IMergedObj;
console.log(mergedObj1.name, mergedObj1.age);
// but this solution is very cumbersome if we have to do it every time.
// to help with this we can create a generic function
// we create a generic function by adding <> after the function name and we define 2 identifiers
// we start with T for the first identifier type and (alphabetically) U for the second and we assign them to the parameters
// function genericMerge<T, U>(objA: T, objB:U) {
//     return Object.assign(objA, objB);
// }
// for arrow function generic functions if we only define one type we still have to add the , to avoid jsx misunderstanding errors in tsx files const foo = <T, >(x: T) => x;
const genericMerge = <T, U>(objA: T, objB: U) => Object.assign(objA, objB); // just with this we can see that ts infers that this function returns the intersection type of objA and objB because that's the return of Object.assign although we could define it manually if needed
const genericMergedObj = genericMerge(
  { name: 'Lucy', hobbies: ['music', 'sports'] },
  { age: 23 },
);
console.log(
  genericMergedObj.name,
  genericMergedObj.hobbies,
  genericMergedObj.age,
);
// now we are not just saying that objA and objB are generic objects which allows ts just to infer that the union type of both is just a new object but we give each parameter a unique identifier that allows ts to infer that the result of the assign is the union of 2 specific objects
// the types of the parameters are not set in stone when we define the generic function but are set dynamically when we call it
// we can set manually the types for the identifiers in each call of the function if we want to make sure a certain type is used, like when we set in Array or Promise the type of the elements that the array is going to contain or what the promise is returning
interface ITExample {
  team: string;
  id: number;
}
interface IUExample {
  colors: string[];
}
// in this case if the arguments we pass to the genericMerge do not fulfill the contract defined by the interfaces assigned to T and U ts will throw an error
const genericMergedObj1 = genericMerge<ITExample, IUExample>(
  { id: 1, team: 'Broncos' },
  { colors: ['white', 'orange'] },
);
console.log(
  genericMergedObj1.id,
  genericMergedObj1.team,
  genericMergedObj1.colors,
);
// usually this is not done since it is redundant because ts infers the type from the generic function call and that's the idea behind this functionality

// Constrains
// in the previous code about generic functions we can incur into the problem that someone pass a non object parameter to the merge function
const genericMergedObject2 = genericMerge({ test: 'string' }, 30);
console.log(genericMergedObject2); // it ignores the 30 because its a number and when it tries to assign it silently fails
// using constrains we can keep the advantages of having a generic but we can prevent this kind of issues
// we do not care how is the object shape but we want it to be some form of an object
// to do this we use the extends keyword in the generic type definition
const genericMerge1 = <T extends object, U extends object>(objA: T, objB: U) =>
  Object.assign(objA, objB);
// const genericMergedObject3 = genericMerge1({day:'monday'}, 30); // this would fail since 30 is not object type
const genericMergedObject3 = genericMerge1(
  { day: 'monday' },
  { subject: 'math' },
);
console.log(genericMergedObject3.day, genericMergedObject3.subject);
// we can use any kind of type as constrain included union types, intersections, custom, Interfaces, etc...
// we do not have to constrain all generic types you can constrain only one, etc...

// Another generic function
interface Lengthy {
  length: number;
}
// we use the interface to constrain types accepted by element to elements with length property
const countAndDescribe = <T extends Lengthy>(element: T) => {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }
  return [element, descriptionText];
};
console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe(['sports', 'cooking']));
console.log(countAndDescribe([]));
// console.log(countAndDescribe(4)); // this would fail to compile because numbers do not have length property
console.log(countAndDescribe({ name: 'Randal', length: 5 })); // this works because the element we pass has a length property
// the generic function saves us to have to create a bunch of function overloads to handle all possible types for the parameters and returns

// keyof constraint
// this is another type of constrain to use in generic functions
// in this case we need to guarantee that the key is going to be in the object to be able to extract its value
// keyof operator produces a string or numeric literal union of its keys, so it ensures that the key parameter is an actual key of the T object
const extractAndConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U,
) => {
  return `Value of ${key} is: ${obj[key]}`;
};
console.log(extractAndConvert({ name: 'John', surname: 'Doe' }, 'name'));
// console.log(extractAndConvert({ name: 'John', surname: 'Doe' }, 'age')); // this would fail since age is not a key of the object

// Generic classes
// ** this is a generic interface to help us with the generic object we want**
interface IGenericObject<T> {
  [key: string]: T;
}
class DataStorage<T> {
  // we could constrain the generic class using extends as with generic functions class DataStorage<T extends string> also we can have all the generic types we want
  // in this case we might not care about the kind of data we storing in our data array and there's where a generic class may be handy
  // in this case we want to ensure its uniform data, the same type of data but any kind of data
  get storedData() {
    return this.data.length ? this.data : 'No data stored';
  }
  constructor(private data: T[] = []) {}
  addItem(item: T) {
    this.data = [...this.data, item];
  }
  removeItem(item: T) {
    // we could also have generic types specific for class methods as we have generic functions
    if (typeof item === 'object') {
      this.data = this.data.filter((element: IGenericObject<any>) =>
        typeof element === 'object'
          ? !Object.entries(item).every(
              ([key, value]) => element[key] && element[key] === value,
            )
          : true,
      );
    } else {
      this.data = this.data.filter(element => element !== item);
    }
  }
}
// in this case we define T in the DataStorage initialization and it will only accept to have this types in the data array
const combinedStorage = new DataStorage(['Jenny', 30, true]);
console.log(combinedStorage.storedData);
// combinedStorage.addItem({name:'foo'}); this would fail because object is not in the array the moment T was inferred
combinedStorage.addItem(40);
combinedStorage.removeItem(true);
console.log(combinedStorage.storedData);
combinedStorage.addItem(true);
console.log(combinedStorage.storedData);
// in this case T is not defined in the moment we create the new instance
const combinedStorage2 = new DataStorage();
combinedStorage2.addItem('Jhonny');
console.log(combinedStorage2.storedData);
// because  of that it lets us to add any kind of type so we are missing what we wanted to achieve with the generic class
combinedStorage2.addItem(34);
console.log(combinedStorage2.storedData);
// to solve this we can cast T type when we create the instance
const textStorage = new DataStorage<string>();
// textStorage.addItem(40); // this would fail since we have stated that T is string type
textStorage.addItem('Monique');
console.log(textStorage.storedData);
// with the current implementation of the generic class we will have a problem with object arrays when removing objects since they are referenced types
const objStorage = new DataStorage<object>([{ name: 'Mercy' }]);
objStorage.addItem({ color: 'blue' });
console.log(objStorage.storedData);
// it is not removed since it is not the same reference
objStorage.removeItem({ color: 'blue' });
console.log(objStorage.storedData);
const combinedStorage3 = new DataStorage<
  string | number | { [key: string]: any }
>([{ name: 'Mercy' }, 30, 'corridor']);
console.log(combinedStorage3.storedData);
combinedStorage3.addItem({ color: 'red' });
console.log(combinedStorage3.storedData);
combinedStorage3.removeItem(30);
console.log(combinedStorage3.storedData);
combinedStorage3.removeItem({ name: 'Mercy' });
console.log(combinedStorage3.storedData);

// Generic utility types
// there are some utility generic types built in
// Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
const createCourseGoal = (
  title: string,
  description: string,
  date: Date,
): CourseGoal => {
  // imagine that for some reason we need to do some kind of validation of the data and we will be adding the properties step by step
  // we use Partial generic utility type to define courseGoal as a CourseGoal but that right now it has not all the properties it should
  // what partial does is to add optional "?" to every property of the type / interface / object it embraces
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // now, before returning, we have to cast courseGoal as CourseGoal since the function expects the return to be that type and right now is a Partial CourseGoal
  return courseGoal as CourseGoal; // its also valid to use the other form of type casting return <CourseGoal>courseGoal;
};
// another use case could be to need only temporary for some reason to make all the properties optional
// Readonly
const namesArray = ['Leonard', 'Ernest'];
// as we know we can modify consts using methods allowed in their types like push
namesArray.push('Anna');
// Readonly generic utility type allows is to deny this
const readonlyNamesArray: Readonly<string[]> = ['Leonard', 'Ernest'];
// readonlyNamesArray.push('Anna'); this would throw a ts error since readonlyNamesArray is now readonly and cannot be modified even by methods
// this is not limited only for arrays but also for objects for example

// generic types allows you to lock for a flexible type for all the function call or the class instance while union types allows you to use a set of types for every function call or the instance of the class
