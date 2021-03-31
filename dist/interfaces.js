"use strict";
const user1 = {
    name: 'Randolph',
};
console.log(user1);
const user2 = {
    name: 'Teo',
    greet(message) {
        console.log(`${message} ${this.name}`);
    },
};
console.log(user2);
user2.greet('Hello');
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(message) {
        console.log(`${message} ${this.name}`);
    }
    farewell(message) {
        console.log(`${message} ${this.name} ${this.age}`);
    }
}
const user3 = new Person('Jenny', 30);
user3.farewell('Bye bye');
let user4;
user4 = new Person('Rachel', 24);
class Person1 {
    constructor(name) {
        this.name = name;
    }
    greet(message) {
        console.log(message);
    }
}
const user5 = new Person1('Sophie');
console.log(user5);
const addFn = (a, b) => a + b;
class Person2 {
    constructor(name) {
        this.name = name;
    }
}
const user6 = new Person2();
console.log(user6);
