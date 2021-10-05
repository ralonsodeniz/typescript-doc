const button = < HTMLButtonElement>document.querySelector("button");
// ! before the getElementById tells typescript im sure that the input element with that id is going to exist
const input1 = document.getElementById("num1")! as HTMLInputElement;
// as HTMLInputElement is type casting, we letting ts know that the element with that id is an html input
const input2 = document.getElementById("num2") as HTMLInputElement;

const add = (num1: number, num2: number) => num1 + num2;

button.addEventListener("click", () => {
  console.log(add(+input1.value, +input2.value));
});
