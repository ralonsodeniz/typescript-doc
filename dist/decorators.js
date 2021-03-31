"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const Logger = (constructor) => {
    console.log('Logging...');
    console.log(constructor);
};
let Person3 = class Person3 {
    constructor() {
        this.name = 'Terry';
        console.log('Creating person object');
    }
};
Person3 = __decorate([
    Logger
], Person3);
const person1 = new Person3();
console.log(person1);
const LoggerFactory = (message) => (_) => {
    console.log(`Logging: ${message}`);
};
let Person4 = class Person4 {
    constructor() {
        this.name = 'Joe';
        console.log('Creating person object');
    }
};
Person4 = __decorate([
    LoggerFactory('Logging factory!')
], Person4);
const person2 = new Person4();
console.log(person2);
const WithTemplate = (template, hookId) => (constructor) => {
    console.log('Rendering template...');
    const hookEl = document.getElementById(hookId);
    const instance = new constructor();
    if (hookEl) {
        hookEl.innerHTML = template;
        const h1 = hookEl.querySelector('h1');
        if (h1)
            h1.appendChild(document.createElement('span')).innerText = `, ${instance.name}`;
    }
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.test = 'test string';
        }
    };
};
let Person5 = class Person5 {
    constructor() {
        this.name = 'Minari';
        console.log('Creating person object');
    }
};
Person5 = __decorate([
    WithTemplate('<h1>My person object</h1>', 'template-test')
], Person5);
const person3 = new Person5();
console.log(person3);
let Person6 = class Person6 {
    constructor() {
        this.name = 'Minari';
    }
};
Person6 = __decorate([
    LoggerFactory('Hello World'),
    WithTemplate('<h1>My person object</h1>', 'template-test')
], Person6);
const person4 = new Person6();
console.log(person4);
const Log = (target, propertyKey) => {
    console.log('Property decorator');
    console.log(target, propertyKey);
};
class Product {
    constructor(title, _price) {
        this._price = _price;
        this.title = title;
    }
    set price(value) {
        if (value) {
            this._price = value;
        }
        else
            throw new Error('invalid price value');
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
const Log2 = (target, name, descriptor) => {
    console.log('Accessor decorator');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
};
const Log3 = (target, name, descriptor) => {
    console.log('Method decorator');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
};
const Log4 = (target, propertyKey, index) => {
    console.log('Parameter decorator');
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('index', index);
};
class Product1 {
    constructor(title, _price) {
        this._price = _price;
        this.title = title;
    }
    set price(value) {
        if (value) {
            this._price = value;
        }
        else
            throw new Error('invalid price value');
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log2
], Product1.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product1.prototype, "getPriceWithTax", null);
const WithTemplate1 = (template, hookId) => (originalConstructor) => {
    return class extends originalConstructor {
        constructor(...rest) {
            super(...rest);
            const hookEl = document.getElementById(hookId);
            if (hookEl) {
                hookEl.innerHTML = template;
                const h1 = hookEl.querySelector('h1');
                if (h1)
                    h1.appendChild(document.createElement('span')).innerText = `, ${this.name}`;
            }
        }
    };
};
let Person7 = class Person7 {
    constructor() {
        this.name = 'Leonor';
    }
};
Person7 = __decorate([
    WithTemplate1('<h1>My person object</h1>', 'template-test')
], Person7);
const person7 = new Person7();
const Autobind = (_, _2, descriptor) => {
    const { value: originalMethod, writable: _3 } = descriptor, restDesc = __rest(descriptor, ["value", "writable"]);
    const newDescriptor = Object.assign(Object.assign({}, restDesc), { get() {
            return originalMethod.bind(this);
        } });
    return newDescriptor;
};
class Printer {
    constructor() {
        this.message = 'This works';
    }
    showMessage(message) {
        console.log(`${this.message} ${message}`);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
console.log(printer);
const clickButton = document.querySelectorAll('button')[1];
clickButton.addEventListener('click', () => printer.showMessage('hello'));
class Validator {
    constructor() {
        this._validationConfig = {};
    }
    get validatorConfig() {
        return this._validationConfig;
    }
    addValidator(input, type) {
        this._validationConfig[input] = this._validationConfig[input]
            ? this._validationConfig[input].some((validator) => validator === type)
                ? [...this._validationConfig[input]]
                : [...this._validationConfig[input], type]
            : [type];
    }
}
const validator = new Validator();
const Required = (validator) => (_, propertyKey) => {
    validator.addValidator(propertyKey, 'required');
};
const Positive = (validator) => (_, propertyKey) => {
    validator.addValidator(propertyKey, 'positive');
};
const MinLength = (validator) => (_, propertyKey) => {
    validator.addValidator(propertyKey, 'min-length');
};
const validate = (obj, validatorConfig) => Object.entries(validatorConfig).every(([input, types]) => types.every((type) => (type === 'required' && obj[input]) ||
    (type === 'positive' && obj[input] > 0) ||
    (type === 'min-length' && obj[input].length > 4)));
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required(validator),
    MinLength(validator)
], Course.prototype, "title", void 0);
__decorate([
    Positive(validator)
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse, validator.validatorConfig)) {
        alert('please insert valid parameters');
    }
    else {
        console.log(createdCourse);
        console.log(validator);
    }
    ;
});
