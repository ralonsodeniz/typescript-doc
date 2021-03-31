const basicAdd = (n1: number, n2: number, showResult: boolean, phrase: string) => {
  if (showResult) console.log(`${phrase}${n1 + n2}`);
  return n1 + n2;
};

const number1 = 5;
const number2 = 2.8;
const basicPrintResult = true;
const resultPhrase = 'Result is: ';

basicAdd(number1, number2, basicPrintResult, resultPhrase);
