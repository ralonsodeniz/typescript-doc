"use strict";
const person = {
    name: 'Raúl',
    age: 36,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
};
let favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person.age);
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var Role2;
(function (Role2) {
    Role2[Role2["ADMIN"] = 5] = "ADMIN";
    Role2[Role2["READ_ONLY"] = 6] = "READ_ONLY";
    Role2[Role2["AUTHOR"] = 7] = "AUTHOR";
})(Role2 || (Role2 = {}));
var Role3;
(function (Role3) {
    Role3["ADMIN"] = "ADMIN";
    Role3[Role3["READ_ONLY"] = 100] = "READ_ONLY";
    Role3[Role3["AUTHOR"] = 200] = "AUTHOR";
})(Role3 || (Role3 = {}));
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
};
if (newPerson.role === Role.AUTHOR)
    console.log('is admin');
if (newPerson1.role === 100)
    console.log('is read only');
