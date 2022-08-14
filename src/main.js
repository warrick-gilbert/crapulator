// improvements: move button data into another js file, import as module

import {
  buttonRow1,
  buttonRow2,
  buttonRow3,
  buttonRow4,
  buttonRow5,
} from "./module-data";

import fetchData from "./module-randomAPI";

let windowWidth;
// if the user is entering a multi-digit number into the result window
let buildingInput = true;
let userNumber = 0;
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

    // eval(buttonFunction);

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
  // Shouldn't build a number if they've just pressed "+"
  console.log(number.toString());
  if (buildingInput && Math.abs(userNumber) < upperLimitNumber) {
    userNumber = userNumber.toString() + number.toString();
    number !== "." ? (userNumber = parseFloat(userNumber)) : "";
    // BUG: user can press "." twice
    updateResultWindow();
  }
}
function clearFunction() {
  // reset all
  console.log("clearFunction called");
  userNumber = 0;
  buildingInput = true;
  updateResultWindow();
}

function addingFunction() {
  console.log("I am the addingFunction");
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

function randomFunction() {
  console.log(userNumber);
  //   console.log(`randomWord is: ${fetchData()}`);
  //   console.log(typeof fetchData);
  userNumber = fetchData();
  console.log(userNumber);

  updateResultWindow();

  // let userNumber become a random number or some other random thing
}

console.log(`randomWord is: ${fetchData()}`);
