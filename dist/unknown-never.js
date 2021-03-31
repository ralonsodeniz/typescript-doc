"use strict";
let userInput;
userInput = 5;
userInput = 'placeholder';
let userName;
if (typeof userInput === 'string')
    userName = userInput;
const generateError = (message, code) => {
    throw { message, errorCode: code };
};
const returnedError = generateError('An error occurred!', 500);
console.log(returnedError);
