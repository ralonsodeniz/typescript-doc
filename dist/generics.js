"use strict";
const names = ['Ron', 'Peter'];
console.log(names[0].split(''));
const promise = new Promise(resolve => {
    setTimeout(() => resolve('this is done'), 2000);
});
promise.then(data => console.log(data));
const merge = (objA, objB) => Object.assign(objA, objB);
const mergedObj = merge({ name: 'Henry' }, { age: 34 });
const mergedObj1 = merge({ name: 'Hilary' }, { age: 42 });
console.log(mergedObj1.name, mergedObj1.age);
const genericMerge = (objA, objB) => Object.assign(objA, objB);
const genericMergedObj = genericMerge({ name: 'Lucy', hobbies: ['music', 'sports'] }, { age: 23 });
console.log(genericMergedObj.name, genericMergedObj.hobbies, genericMergedObj.age);
const genericMergedObj1 = genericMerge({ id: 1, team: 'Broncos' }, { colors: ['white', 'orange'] });
console.log(genericMergedObj1.id, genericMergedObj1.team, genericMergedObj1.colors);
const genericMergedObject2 = genericMerge({ test: 'string' }, 30);
console.log(genericMergedObject2);
const genericMerge1 = (objA, objB) => Object.assign(objA, objB);
const genericMergedObject3 = genericMerge1({ day: 'monday' }, { subject: 'math' });
console.log(genericMergedObject3.day, genericMergedObject3.subject);
const countAndDescribe = (element) => {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    }
    else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`;
    }
    return [element, descriptionText];
};
console.log(countAndDescribe('Hi There!'));
console.log(countAndDescribe(['sports', 'cooking']));
console.log(countAndDescribe([]));
console.log(countAndDescribe({ name: 'Randal', length: 5 }));
const extractAndConvert = (obj, key) => {
    return `Value of ${key} is: ${obj[key]}`;
};
console.log(extractAndConvert({ name: 'John', surname: 'Doe' }, 'name'));
class DataStorage {
    constructor(data = []) {
        this.data = data;
    }
    get storedData() {
        return this.data.length ? this.data : 'No data stored';
    }
    addItem(item) {
        this.data = [...this.data, item];
    }
    removeItem(item) {
        if (typeof item === 'object') {
            this.data = this.data.filter((element) => typeof element === 'object'
                ? !Object.entries(item).every(([key, value]) => element[key] && element[key] === value)
                : true);
        }
        else {
            this.data = this.data.filter(element => element !== item);
        }
    }
}
const combinedStorage = new DataStorage(['Jenny', 30, true]);
console.log(combinedStorage.storedData);
combinedStorage.addItem(40);
combinedStorage.removeItem(true);
console.log(combinedStorage.storedData);
combinedStorage.addItem(true);
console.log(combinedStorage.storedData);
const combinedStorage2 = new DataStorage();
combinedStorage2.addItem('Jhonny');
console.log(combinedStorage2.storedData);
combinedStorage2.addItem(34);
console.log(combinedStorage2.storedData);
const textStorage = new DataStorage();
textStorage.addItem('Monique');
console.log(textStorage.storedData);
const objStorage = new DataStorage([{ name: 'Mercy' }]);
objStorage.addItem({ color: 'blue' });
console.log(objStorage.storedData);
objStorage.removeItem({ color: 'blue' });
console.log(objStorage.storedData);
const combinedStorage3 = new DataStorage([{ name: 'Mercy' }, 30, 'corridor']);
console.log(combinedStorage3.storedData);
combinedStorage3.addItem({ color: 'red' });
console.log(combinedStorage3.storedData);
combinedStorage3.removeItem(30);
console.log(combinedStorage3.storedData);
combinedStorage3.removeItem({ name: 'Mercy' });
console.log(combinedStorage3.storedData);
const createCourseGoal = (title, description, date) => {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
};
const namesArray = ['Leonard', 'Ernest'];
namesArray.push('Anna');
const readonlyNamesArray = ['Leonard', 'Ernest'];
