// const person: {
//   name: string;
//   age: number;
// } = {
// it is better to let typescript to infer types from variables declaration to explicit set the types unless we want to create a Type
const person: {
  name: string;
  age: number;
  hobbies: string[];
  // this is how we define a Tuple in typescript
  role: [number, string];
} = {
  name: 'Raúl',
  age: 36,
  hobbies: ['Sports', 'Cooking'],
  // Tuple are fixed length and type arrays
  // are some kind of defined information we need to store in an array for some reason and that information is already formatted with some meaning
  // in this case we want a numeric identifier of the role and the description but nothing more
  role: [2, 'author'],
};
// we dont want to allow array methods that could alter this structure so this is when Tuples are useful
// person.role.push('admin'); NOTE ON PUSH typescript cannot catch this error, this is a typescript limitation
// person.role = [5, 'admin', 'new'] This would throw an error since our Tuple is 2 items length, this is controlled
// person.role[1] = 10; This would throw an error since the type of the second item of our Tuple has to be an string

// to declare an array we use [] preceded by the type of the elements the array will include
let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.age);
console.log(person.name);
for (const hobby of person.hobbies) {
  console.log(hobby);
}

// in this case the role is going to be an Enum which represents an enumerated global constant identifiers
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
// Enums does not have to have its value always as seen before by default 0, 1, 2
// you can assign the value you want, you can assign an initial value and it will carry on from that one
enum Role2 {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
}
// you can give exact values to each one, it does not have to be a number and you can mix
enum Role3 {
  ADMIN = 'ADMIN',
  READ_ONLY = 100,
  AUTHOR = 200,
}

const newPerson = {
  name: 'Raúl',
  age: 36,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};

const newPerson1 = {
  name: 'Raúl',
  age: 36,
  hobbies: ['Sports', 'Cooking'],
  role: Role3.READ_ONLY,
}

if (newPerson.role === Role.AUTHOR) console.log('is admin');
if (newPerson1.role === 100) console.log('is read only');
