// unknown type
let userInput: unknown;
// unknown type accepts every kind of type
userInput = 5;
userInput = 'placeholder';
// the difference with any is that you cannot assign an unknown defined variable to a defined type variable
let userName: string;
// userName = userInput; this throws a ts error since userInput is unknown type and ts cannot know for sure its going to be compatible
// if userInput was any type instead, the assign before would not throw error since is the most flexible type in ts, in fact as we know is like it was vanilla js
// if we wanted to enforce the assignation we need to do a runtime check like we have seen before
if (typeof userInput === 'string') userName = userInput; // in this case ts understands that the assignation would be only done if types are correct
// unknown is the way to go when we don't know what type a variable is going to be so we enforce extra type checking in the code

// never type
const generateError = (message: string, code: number): never => {
  throw { message, errorCode: code };
};
const returnedError = generateError('An error occurred!', 500)
// the previous function never returns anything, is not that it does not return but it never returns because the throw interrupts the execution
console.log(returnedError);
// as consequence the console log will not be executed
// ts by default will infer void as the returning type because never is a newer type not included in the first iterations of ts so in this case is correct to explicitly define the return type
