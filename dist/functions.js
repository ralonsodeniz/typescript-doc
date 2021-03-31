"use strict";
const addFunction = (n1, n2) => n1 + n2;
const printResult = (num) => console.log(`Result: ${num}`);
printResult(addFunction(5, 12));
let combineValues;
combineValues = addFunction;
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
addAndHandle(10, 20, result => console.log(result));
const addAndReuseHandleResult = (n1, n2, n3, cb) => {
    const result = n1 + n2;
    const cbResult = cb(result);
    return cbResult + n3;
};
addAndReuseHandleResult(10, 20, 30, result => result + 1);
