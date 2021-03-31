// ts infers the type of the return, in this case, number
const addFunction = (n1: number, n2: number) => n1 + n2;
// if we want to explicitly set the return type we add a colon and type before the parameters declaration
// const add2 = (n1: number, n2: number): number => n1 + n2;
// as for variables is a good practice to let ts to infer the type of the return unless we need to define it for a certain reason
// when a function returns nothing the return type is void
// const printResult = (num: number): void => console.log(`Result: ${num}`);
const printResult = (num: number) => console.log(`Result: ${num}`);
printResult(addFunction(5, 12));
// function types allows us to describe a kind of function that will be assigned to a variable
let combineValues: (a: number, b: number) => number; // combineValues will accept any function that takes 2 number params and returns a number
combineValues = addFunction; // this is valid
// combineValues = printResult; this is invalid because it does not fulfills the described function type

// Function types and callbacks
// we use the function type to define the cb parameter
const addAndHandle = (n1: number, n2: number, cb: (a: number) => void) => {
  const result = n1 + n2;
  cb(result);
};
addAndHandle(10, 20, result => console.log(result));
// one of the advantages of defining the function type for the callback is that in the callback we pass to the function ts infers the type of the param from the function definition and gives us autocompletion for number type in this case
// if we try to pass more than one argument typescript would return an error
// if the callback returns something ts would not return an error because the void defined in the cb definition just says that we are not doing anything with the returning value of the cb inside the function
// if we wanted to do something with the returning value of the callback we have to assign the expected type
const addAndReuseHandleResult = (
  n1: number,
  n2: number,
  n3: number,
  cb: (a: number) => number,
) => {
  const result = n1 + n2;
  const cbResult = cb(result);
  return cbResult + n3;
};
// addAndReuseHandleResult(10,20,30, (result) => `${result}`) this would throw a ts error since we are returning a string and a number is expected
addAndReuseHandleResult(10, 20, 30, result => result + 1);
