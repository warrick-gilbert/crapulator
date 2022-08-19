// improvements: move button data into another js file, import as module

import {
  buttonRow1,
  buttonRow2,
  buttonRow3,
  buttonRow4,
  buttonRow5,
} from "./module-buttons";

import fetchData from "./module-randomAPI";
import { handleMemoryPlusClick } from "./module-memoryAPI"; // CRUD module

let windowWidth;
// if the user is entering a multi-digit number into the result window
let buildingInput = true;
let userNumber = 0;
let prevNumber = 0; // this is the number previously built.
// Need to remember it when you hit +
const upperLimitNumber = 10000000;

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
    const textnode = document.createTextNode(buttonText); // Create a text node:
    newButton.appendChild(textnode); // Append the text node to the "div" node:

    let buttonColour = arrayOfButtons[i].buttonColour; // pull the colour out of the array
    newButton.classList.add(buttonColour); // add it to the button,

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

function updateResultWindow() {
  // target the node
  const replaceThis = document.querySelector("#resultWindowA");
  replaceThis.innerText = userNumber;
}
updateResultWindow(); // run once to put starting value in

// takes a number and builds up a multi-digit number
function buildUserNumber(number) {
  // only work if user has started building up a number.
  // Shouldn't keep building a number if they've just pressed "+"
  console.log(number.toString());
  if (buildingInput && Math.abs(userNumber) < upperLimitNumber) {
    userNumber = userNumber.toString() + number.toString();
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
function clemFunction() {
  userNumber = "Do not clemerforate";
  buildingInput = false;
  updateResultWindow();
}
function ennuiFunction() {
  userNumber = "ennui";
  buildingInput = false;
  updateResultWindow();
}

function addingFunction() {
  console.log("I am the addingFunction");
  savePrevNumber();
}
function dividingFunction() {
  console.log("I am the addingFunction");
}

function multiplyingFunction() {
  buildingInput = false; // stops the usernumber from growing
}

function numberFunction(e) {
  console.log(`The ${e.currentTarget.myParam} was clicked`);
  // tell a function to build up the userNumber with this click
  buildUserNumber(e.currentTarget.myParam);
}

// this is an async function because it uses a fetch statement from the randomAPI module
// let userNumber become a random number or some other random thing
async function randomFunction() {
  buildingInput = true;
  userNumber = await fetchData();
  updateResultWindow();
}

function equalFunction() {
  userNumber = prevNumber + userNumber;
  buildingInput = false; // stops the usernumber from growing
  updateResultWindow();
  // BUG: Adding singe numbers concatenates them, they're being remembered as strings
}

function handleMemoryPlusClick2(userNumber) {
  handleMemoryPlusClick(userNumber);
}

// console.log(userNumber);
// console.log(userNumber);
//   console.log(`randomWord is: ${fetchData()}`);
//   console.log(typeof fetchData);
// console.log(`randomWord is: ${fetchData()}`);
