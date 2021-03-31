"use strict";
class Department {
    constructor(name, employees = []) {
        this.employees = [];
        this.name = name;
        this.employees = employees;
    }
    describe() {
        console.log(`Department: ${this.name}`);
    }
    addEmployee(employee) {
        this.employees = [...this.employees, employee];
    }
    printEmployeesInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    static createEmployee(name) {
        return { name };
    }
}
Department.fiscalYear = 2021;
const accounting = new Department('Accounting', ['Doe']);
accounting.describe();
accounting.addEmployee('John');
accounting.printEmployeesInformation();
console.log(accounting.name);
class ShorthandDepartment {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees = [...this.employees, employee];
    }
    printEmployeesInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends ShorthandDepartment {
    constructor(id, admin) {
        super('IT', id);
        this.admin = admin;
    }
    printAdmin() {
        console.log(this.admin);
    }
    changeAdmin(admin) {
        this.admin = admin;
    }
    addEmployee(employee) {
        if (employee === 'Tete')
            return;
        this.employees = [...this.employees, employee];
    }
    describe() {
        console.log(`${this.name} Department: ID ${this.id}`);
    }
}
const itDep = new ITDepartment(3, 'Leonor');
itDep.describe();
itDep.printAdmin();
itDep.printEmployeesInformation();
itDep.changeAdmin('Leon');
itDep.addEmployee('Rex');
itDep.addEmployee('Tete');
itDep.printAdmin();
console.log(itDep);
class AccountingDepartment extends ShorthandDepartment {
    constructor(id, reports = []) {
        super('Accounting', id);
        this.reports = reports;
        this.lastReport = reports[reports.length - 1];
    }
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error('No report found');
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error('Invalid value');
        this.addReport(value);
    }
    addEmployee(employee) {
        if (employee === 'Peter')
            return;
        this.employees = [...this.employees, employee];
    }
    addReport(text) {
        this.reports = [...this.reports, text];
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    describe() {
        console.log(`${this.name} Department: ID ${this.id}`);
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new AccountingDepartment(4, ['Initial report']);
        return this.instance;
    }
}
const ACDepartment = AccountingDepartment.getInstance();
console.log(ACDepartment.mostRecentReport);
ACDepartment.addReport('First report');
console.log(ACDepartment.mostRecentReport);
ACDepartment.mostRecentReport = 'Last report';
console.log(ACDepartment.mostRecentReport);
ACDepartment.printReports();
const employee1 = Department.createEmployee('Rudolph');
console.log(employee1);
console.log(Department.fiscalYear);
