const numbersDisplay = document.querySelector("#numbers-display");

const numBtnsNodeList = document.querySelectorAll(".num-button");
const numBtnsList = Array.from(numBtnsNodeList)

let inputs = {
  a: "",
  operator: null,
  b: null,
};

function checkKey(e) {
  console.log("rawInput", e.key)
  getInput(e.key);
  document.querySelector(`#btn-${e.key}`).classList.add("pressed");
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
};

function getInput(val) {
  const parsedVal = parseInt(val);
  if (parsedVal || parsedVal === 0) {
    if (!inputs.operator && inputs.a.length < 9) {
      console.log("Int:", parsedVal);
      inputs.a += parsedVal;
      numbersDisplay.innerText = inputs.a
    }
  }
  else {
    console.log("Not Int! Value:", val);
  }
};

window.addEventListener("keydown", checkKey);

//numbersDisplay.innerText = "NOPE!";

window.onload = () => initialSetup();