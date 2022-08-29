// improvements: move button data into another js file, import as module

import {
  buttonRow1,
  buttonRow2,
  buttonRow3,
  buttonRow4,
  buttonRow5,
} from "./module-buttons";

import fetchData from "./module-randomAPI";

import {
  // functions and variables from the memory module (CRUD)
  handleMemoryPlusClick,
  handleMemoryRecallClick,
  handleMemoryUpdateClick,
  handleMemoryDeleteClick,
} from "./module-memoryAPI";

let windowWidth;
// if the user is entering a multi-digit number into the result window
let buildingInput = true;
export let userNumber = 0;
let prevNumber = 0; // this is the number previously built. Need to remember it when you hit +
const upperLimitNumber = 10000000;
let storedOperator = "add"; // remember what operator (+-*/) the user pressed for when = is hit

window.addEventListener("load", getDimensions);
function getDimensions() {
  windowWidth = window.innerWidth; // we want window width, not screen width
  //   console.log(`windowWidth is ${windowWidth}`);
}
// (() => console.log("immediately invoked arrow function"))();  //works

const buildRow = (arrayOfButtons, rowToMake) => {
  // builds a row of buttons
  // create a new row
  const newRow = document.createElement("div"); // Create a div node to hold the new row:
  newRow.id = rowToMake; // give an id to the row we've made
  document.querySelector("#buttonGrid").appendChild(newRow); // Append the node

  //   now fill this row with buttons
  for (let i = 0; i < arrayOfButtons.length; i++) {
    const newButton = document.createElement("div"); // Create a div node:
    newButton.classList.add("button"); // give it the class "button"

    let buttonText = arrayOfButtons[i].symbol; // pull the symbol out of the array
    const textnode = document.createTextNode(buttonText); // Create a text node with the buttonText
    newButton.appendChild(textnode); // Append the text node to the "div" node:

    let buttonColour = arrayOfButtons[i].buttonColour; // pull the colour out of the array
    newButton.classList.add(buttonColour); // add it to the button,

    let buttonID = arrayOfButtons[i].ID; // pull the button id out of the array
    newButton.setAttribute("id", buttonID);

    // adds the particular function to the button
    let buttonFunction = `${arrayOfButtons[i].particularFunction}`;
    // console.log(`buttonFunction is of type ${typeof buttonFunction}`);
    // console.log(typeof numberFunction);
    // console.log(`buttonFunction is: ${buttonFunction}`);

    newButton.addEventListener("click", eval(buttonFunction)); // works but poor practise?

    if (buttonFunction === "numberFunction") {
      newButton.addEventListener("click", eval(buttonFunction)); // works but poor practise?
      // add the number as a property (?) of the newButton object
      //   console.log(`newButton is of type ${typeof newButton}`);
      newButton.myParam = arrayOfButtons[i].symbol;
    } else {
      //   console.log(`buttonFunction is: ${buttonFunction}`);
      //   console.log(`window[buttonFunction] is: ${window[buttonFunction]}`);

      newButton.addEventListener("click", eval(buttonFunction)); // works but poor practise?
    }
    // Append the node to the newRow
    document.querySelector("#" + rowToMake).appendChild(newButton);
  }
};

buildRow(buttonRow1, "firstRow");
buildRow(buttonRow2, "secondRow");
buildRow(buttonRow3, "thirdRow");
buildRow(buttonRow4, "fourthRow");
buildRow(buttonRow5, "fifthRow");

export function updateResultWindow() {
  // target the node
  const replaceThis = document.querySelector("#resultWindowA");
  replaceThis.innerText = userNumber;
  // console.log(`updateResultWindow called with userNumber: ${userNumber}`);
}

updateResultWindow(); // run once to put starting value in

// takes a number and builds up a multi-digit number
function buildUserNumber(number) {
  // only work if user has started building up a number.
  // Shouldn't keep building a number if they've just pressed "+"
  // console.log(number.toString());
  if (buildingInput && Math.abs(userNumber) < upperLimitNumber) {
    userNumber = userNumber.toString() + number.toString();
    // get rid of the initial zero, unless the user presses "."
    number !== "." ? (userNumber = parseFloat(userNumber)) : "";
    // BUG: user can press "." twice
  } else {
    // start building a new number from scratch
    userNumber = number;
    buildingInput = true;
  }
  updateResultWindow();
}

function savePrevNumber() {
  // if the number has finished being built, remember it, ready to multiply it
  prevNumber = userNumber;
  console.log(`prevNumber is: ${prevNumber}`);
  buildingInput = false;
}

function clearFunction() {
  // reset all
  console.log("clearFunction called");
  userNumber = 0;
  buildingInput = true;
  updateResultWindow();
}

function addingFunction() {
  savePrevNumber();
  buildingInput = false; // stops the usernumber from growing
  storedOperator = "add";
}
function subtractingFunction() {
  savePrevNumber();
  buildingInput = false; // stops the usernumber from growing
  storedOperator = "subtract";
}
function dividingFunction() {
  savePrevNumber();
  buildingInput = false; // stops the usernumber from growing
  storedOperator = "divide";
}

function multiplyingFunction() {
  savePrevNumber();
  buildingInput = false; // stops the usernumber from growing
  storedOperator = "multiply";
}

function numberFunction(e) {
  // used when the user hits a number button
  buildUserNumber(e.currentTarget.myParam);
}

function equalFunction() {
  buildingInput = false; // stops the usernumber from growing
  userNumber = mergeThese(prevNumber, userNumber, storedOperator);
  updateResultWindow();
}

// this is an async function because it uses a fetch statement from the randomAPI module
// let userNumber become a random number or some other random thing
async function randomFunction() {
  buildingInput = true;
  userNumber = await fetchData();
  updateResultWindow();
}

// toggle the style of the button
function toggleButton(IDToToggle) {
  // console.log(`Toggle function was called by ${toggleButton.caller}`);
  let button = document.querySelector("#" + IDToToggle);
  button.classList.toggle("orange");
  // button.classList.add("orange");
  // console.log(button.getAttribute("class"));
  //
  //
  //
  //
  //
  // BUG: Rand is broken, toggle is partly done,
  // BUG: every save makes button grid respawn.
  //
  //
  //
  //
}

function clemFunction() {
  toggleButton("clem");
  userNumber = "Do not clemerforate";
  buildingInput = false;
  updateResultWindow();
}

function ennuiFunction() {
  userNumber = "ennui";
  buildingInput = false;
  updateResultWindow();
}

function sighFunction() {
  buildingInput = true;
  userNumber = "sigh";
  updateResultWindow();
}
function flanFunction() {
  buildingInput = true;
  userNumber = "flan";
  updateResultWindow();
}

let memoryBinCreated = false; // changed once the user creates their first memory

function handleMemoryPlusClick2() {
  if (memoryBinCreated == false) {
    // only make a new memory bin if one doesn't exists
    buildingInput = false;
    handleMemoryPlusClick(userNumber);
    memoryBinCreated = true;
    prevNumber = userNumber;
  } else {
    // if something is already in memory, merge the two things and update memory
    buildingInput = false;
    // BUG: Shouldn't be prevNumber, but what is stored in memory
    let passThis = mergeThese(prevNumber, userNumber, "add");
    // mergeThese(prevNumber + userNumber);
    handleMemoryUpdateClick(passThis);
    // handleMemoryUpdateClick(prevNumber + userNumber);
  }
}

function handleMemoryRecallClick2() {
  if (memoryBinCreated) {
    userNumber = "...";
    updateResultWindow();
    handleMemoryRecallClick();
    buildingInput = false;
  } else {
    userNumber = "no memory saved";
    updateResultWindow();
  }
}
function handleMemoryDeleteClick2() {
  if (memoryBinCreated) {
    userNumber = "Clearing memory";
    updateResultWindow();
    handleMemoryDeleteClick();
    // buildingInput = false;
  } else {
    userNumber = "no memory to clear";
    updateResultWindow();
  }
}

export function updateUserNumber(arg) {
  userNumber = arg;
}

// how to add banana + 7 or whatever the user is trying to do
function mergeThese(arg1, arg2, operator) {
  // if they're both numbers
  if (Number.isInteger(+arg1 + +arg2)) {
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    console.log(
      `merge called, they're both numbers, storedOperator: ${storedOperator}`
    );
    if (operator === "multiply") {
      console.log("trying to return multiply stuff");
      console.log(`arg1 typeof: ${typeof arg1}`);
      return arg1 * arg2;
    } else if (operator === "divide") {
      return arg1 / arg2;
    } else if (operator === "add") {
      return arg1 + arg2;
    } else if (operator === "subtract") {
      return arg1 - arg2;
    }
  } else if (Number.isInteger(+arg1) || Number.isInteger(+arg2)) {
    // if only one arg is a number, put the number first
    if (Number.isInteger(+arg1)) {
    } else {
      // swaps the args so that the number comes first
      let intermArg = arg1;
      arg1 = arg2;
      arg2 = intermArg;
      // the other is the number
    }
    return arg1 + " " + arg2;
  } else {
    // if neither arg are numbers
    return arg1 + " " + arg2;
  }
}
// console.log(userNumber);
// console.log(userNumber);
//   console.log(`randomWord is: ${fetchData()}`);
//   console.log(typeof fetchData);
// console.log(`randomWord is: ${fetchData()}`);
//
