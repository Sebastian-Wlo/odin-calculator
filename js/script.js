const numbersDisplay = document.querySelector("#numbers-display");
const numBtnsNodeList = document.querySelectorAll(".btn-num");
const numBtnsList = Array.from(numBtnsNodeList);
const clearBtn = document.querySelector("#on-ce");

let inputs = {
  a: "",
  operator: "",
  b: "",
};

let executed = false;

const operations = {
  addition: (a, b) => {
    return (+a + +b).toString();
  },
  subtraction: (a, b) => {
    return (+a - +b).toString();
  },
  multiplication: (a, b) => {
    return (+a * +b).toString();
  },
  division: (a, b) => {
    if (+b === 0) {
      return "nope!";
    } else {
      return (+a / +b).toString();
    }
  },
};

const opKeys = {
  "+": "addition",
  "-": "subtraction",
  "*": "multiplication",
  "/": "division",
};

function executeOperation() {
  let a = inputs.a === "" ? "0" : inputs.a;
  let b = inputs.b === "" ? "0" : inputs.b;
  let op = inputs.operator === "" ? "+" : inputs.operator;
  let returnVal = operations[opKeys[op]](a, b);
  displayValue(returnVal);
  return returnVal;
}

clearBtn.addEventListener("click", (e) => clearAll());

// Initialize the calculator
function init() {
  for (let btn of numBtnsList) {
    btn.addEventListener("click", () => readInput(btn.id.substring(4)));
  }

  clearAll();
}
init();

window.addEventListener("keydown", (e) => {
  if (e.key.match(/^[\d\+\-\*\\]$/)) {
    readInput(e.key);
  } else if (e.key.match(/^[.,]$/)) {
    readInput(".");
  } else if (e.key === "Enter") {
    readInput("=");
  } else if (e.key === "Backspace") {
    clearAll();
  }
});

function readInput(char) {
  if (char.match(/[\d\.,]/)) {
    if (executed) {
      clearAll();
      inputs.a = numToValue(char, inputs.a);
    } else if (inputs.operator === "") {
      inputs.a = numToValue(char, inputs.a);
      executed = false;
    } else {
      inputs.b = numToValue(char, inputs.b);
      executed = false;
    }
  } else if (char === "=") {
    inputs.a = executeOperation();
    executed = true;
  } else if (executed) {
    inputs.operator = char;
    inputs.b = "";
    executed = false;
  } else if (inputs.b === "") {
    inputs.operator = char;
  } else {
    inputs.operator = char;
    inputs.a = executeOperation();
    inputs.b = "";
  }
  console.log(inputs.a, inputs.b, inputs.operator);
}

function clearAll() {
  executed = false;
  inputs = {
    a: "",
    operator: "",
    b: "",
  };
  displayValue(inputs.a);
}

function numToValue(char, input) {
  let returnVal = "";
  if (char === "." || char === ",") {
    if (input === "") {
      returnVal = "0.";
    } else if (input.indexOf(".") === -1) {
      returnVal = input + ".";
    } else {
      returnVal = input;
    }
  } else if (input === "0" || input === "") {
    returnVal = char;
  } else {
    returnVal = input + char;
  }
  displayValue(returnVal);
  return handleStrLen(returnVal);
}

function displayValue(val) {
  if (val === "") {
    numbersDisplay.innerText = 0;
  } else {
    numbersDisplay.innerText = handleStrLen(val);
  }
}

function handleStrLen(value) {
  let maxLength = value.includes(".") ? 11 : 10;
  return value.length >= maxLength ? value.substring(0, maxLength) : value;
}
