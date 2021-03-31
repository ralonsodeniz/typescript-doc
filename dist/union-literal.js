"use strict";
const combine = (input1, input2) => {
    if (typeof input1 === 'number' && typeof input2 === 'number')
        return input1 + input2;
    return input1.toString() + input2.toString();
};
const combineAges = combine(30, 26);
console.log(combineAges);
const combineNames = combine('John', 'Doe');
console.log(combineNames);
const literalNumber2 = 2.8;
const combine2 = (input1, input2, resultConversion) => {
    if ((typeof input1 === 'number' && typeof input2 === 'number') ||
        resultConversion === 'as-number')
        return +input1 + +input2;
    return input1.toString() + input2.toString();
};
const combineAges2 = combine2(30, 26, 'as-number');
console.log(combineAges2);
const combineAgesString = combine2('30', '26', 'as-number');
console.log(combineAgesString);
const combineNames2 = combine2('John', 'Doe', 'as-text');
console.log(combineNames2);
