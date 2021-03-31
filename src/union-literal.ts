// union type
const combine = (input1: number | string, input2: number | string) => {
  // with union types we have a caveat, it does not analyze what types are inside the union so it does not know if + operator is valid for all types within the union and ts will throw an error
  // we need a workaround for this case
  // return input1 + input2;
  if (typeof input1 === 'number' && typeof input2 === 'number')
    return input1 + input2;
  return input1.toString() + input2.toString();
};

const combineAges = combine(30, 26);
console.log(combineAges);
const combineNames = combine('John', 'Doe');
console.log(combineNames);

// literal type
// this type does not only states the type but also the value
const literalNumber2 = 2.8;
// using this in a function declaration in resultConversion
// also custom / alias types
type Combinable = number | string;
// type alias for literal type
// custom / alias types can be used for any combination of type descriptions
type ConversionDescriptor = 'as-number' | 'as-text';
const combine2 = (
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor,
) => {
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  )
    return +input1 + +input2;
  return input1.toString() + input2.toString();
};

const combineAges2 = combine2(30, 26, 'as-number');
console.log(combineAges2);
const combineAgesString = combine2('30', '26', 'as-number');
console.log(combineAgesString);
const combineNames2 = combine2('John', 'Doe', 'as-text');
console.log(combineNames2);
