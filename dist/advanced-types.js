"use strict";
const e1 = {
    name: 'Terry',
    privileges: ['create-server'],
    startDate: new Date(),
};
console.log(e1);
function addGuarded(a, b) {
    return typeof a === 'string' || typeof b === 'string'
        ? a.toString() + b.toString()
        : a + b;
}
const printEmployee = (employee) => {
    console.log('Name: ' + employee.name);
    if ('privileges' in employee)
        console.log('Privileges: ' + employee.privileges);
    if ('startDate' in employee)
        console.log('Started at: ' + employee.startDate);
};
printEmployee(e1);
class Car {
    drive() {
        console.log('driving...');
    }
}
class Truck {
    drive() {
        console.log('driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo... ' + amount);
    }
}
const vehicle1 = new Car();
const vehicle2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck)
        vehicle.loadCargo(34);
};
useVehicle(vehicle1);
useVehicle(vehicle2);
const moveAnimal = (animal) => {
    let speed;
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
const canary = {
    kind: 'bird',
    flyingSpeed: 10,
};
moveAnimal(canary);
let userInputElement = document.getElementById('user-input');
userInputElement = document.getElementById('user-input');
userInputElement.placeholder = 'Insert text here...';
const userInputElement1 = document.getElementById('user-input1');
if (userInputElement1)
    userInputElement1.value = 'not null!';
const userError = {
    id: 'user',
    email: 'Not a valid email!',
    userName: 'Must start with a capital character!',
};
console.log(userError);
const result = addGuarded('John', ' Doe');
const result1 = addGuarded('John', ' Doe');
console.log(result1.split(' '));
const result2 = addGuarded(2, 5);
const result3 = addGuarded('Hello ', 'World');
console.log(result2);
console.log(result3.split(' '));
const fetchedUserData = {
    id: 'u1',
    name: 'Reynolds',
};
const userInputNullish = null;
const storedData = userInputNullish || 'DEFAULT';
const storedDataNullish = userInputNullish !== null && userInputNullish !== void 0 ? userInputNullish : 'DEFAULT';
