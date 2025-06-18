const numbersDisplay = document.querySelector("#numbers-display");

const numBtnsNodeList = document.querySelectorAll(".num-button");
const numBtnsList = Array.from(numBtnsNodeList);
const opBtnsNodeList = document.querySelectorAll(".op-button");
const opBtnsList = Array.from(opBtnsNodeList);
const equalsBtn = document.querySelector("#btn-equals");

let inputs = {
  a: "0",
  operator: null,
  b: "0",
};

const operations = {
  addition: (a, b) => {return a + b},
  subtraction: (a, b) => {return a - b},
  multiplication: (a, b) => {return a * b}
}
const opKeys = {
  "+": "addition",
  "-": "subtraction",
  "*": "multiplication",
  "/": "division"
}

function checkKey(e) {
  let keyValue = e.key;
  for (let operation of Object.keys(opKeys)) {
    if (keyValue === operation) {
      keyValue = opKeys[operation];
      console.log(keyValue)
    }
  }
  getInput(keyValue);
};

function initialSetup() {
  numbersDisplay.innerText = "0";

  // Add eventListeners to Number inputs
  for (let btn of numBtnsList) {
    btn.addEventListener("click", (e) => {
      const buttonVal = e.target.id.replace("btn-", "");
      getInput(buttonVal);
      })
  }

  //Add eventListeners to Operation inputs
  for (let btn of opBtnsList) {
    btn.addEventListener("click", (e) => {
      const buttonVal = e.target.id.replace("btn-", "");
      getInput(buttonVal)
    })
  }
};

function getInput(val) {
  const parsedVal = parseInt(val);
  if (parsedVal || parsedVal === 0) {
    if (!inputs.operator && inputs.a.length < 9) {
      console.log("Int 1:", parsedVal);
      if (inputs.a !== "0"){
        inputs.a += parsedVal;
      } else {
        inputs.a = String(parsedVal);
      }
      numbersDisplay.innerText = inputs.a
    } else if (inputs.operator && inputs.b.length < 9) {
      console.log("Int 2:", parsedVal);
      if (inputs.b !== "0"){
        inputs.b += parsedVal;
      } else {
        inputs.b = String(parsedVal);
      }
      numbersDisplay.innerText = inputs.b;
    }
  } else {
    for (let operation of Object.keys(operations)) {
      if (val === operation) {
        inputs.operator = val;
        console.log("operation detected:", val, operation, "added operation:", inputs)
      }
    }
    //console.log("Not Int! Value:", val);
  }
};

const executeOperation = (inputs) => {
  const firstNumber = +inputs.a;
  const secondNumber = +inputs.b;
  const operation = inputs.operator
  const result = operations[operation](firstNumber, secondNumber)
  inputs.a = String(result);
  inputs.b = "";
  numbersDisplay.innerText = inputs.a;

};

equalsBtn.addEventListener("click", () => executeOperation(inputs));

window.addEventListener("keydown", checkKey);

//numbersDisplay.innerText = "NOPE!";

window.onload = () => initialSetup();