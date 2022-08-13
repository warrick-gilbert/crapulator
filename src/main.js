let windowWidth;

window.addEventListener("load", getDimensions);
function getDimensions() {
  windowWidth = window.innerWidth; // we want window width, not screen width
  //   console.log(`windowWidth is ${windowWidth}`);
}

// (() => console.log("immediately invoked arrow function"))();  //works

const buttonRow1 = [
  {
    symbol: "(",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: ")",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "ennui",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "m+",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "m-",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "mr",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "AC",
    buttonColour: "lightGrey",
    particularFunction: "clearFunction",
  },
  {
    symbol: "±",
    buttonColour: "lightGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "%",
    buttonColour: "lightGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "÷",
    buttonColour: "orange",
    particularFunction: "dividingFunction",
  },
];
const buttonRow2 = [
  {
    symbol: "2nd",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x2",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x3",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "xy",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "ex",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "10x",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "7",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "8",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "9",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "✕",
    buttonColour: "orange",
    particularFunction: "multiplyingFunction",
  },
];
const buttonRow3 = [
  {
    symbol: "2nd",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x2",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x3",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "xy",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "ex",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "10x",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "4",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "5",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "6",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "–",
    buttonColour: "orange",
    particularFunction: "multiplyingFunction",
  },
];
const buttonRow4 = [
  {
    symbol: "2nd",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x2",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x3",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "xy",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "ex",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "10x",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "1",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "2",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "3",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "+",
    buttonColour: "orange",
    particularFunction: "multiplyingFunction",
  },
];
const buttonRow5 = [
  {
    symbol: "2nd",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x2",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "x3",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "xy",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "ex",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "10x",
    buttonColour: "darkGrey",
    particularFunction: "addingFunction",
  },
  {
    symbol: "0",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "0",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: ".",
    buttonColour: "grey",
    particularFunction: "numberFunction",
  },
  {
    symbol: "=",
    buttonColour: "orange",
    particularFunction: "multiplyingFunction",
  },
];

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

    if (buttonFunction === "numberFunction") {
      //   console.log(`Number function chosen ${arrayOfButtons[i].symbol}`);
      newButton.addEventListener("click", window[buttonFunction]);
      // add the number as a property (?) of the newButton object
      //   console.log(`newButton is of type ${typeof newButton}`);
      newButton.myParam = arrayOfButtons[i].symbol;
    } else {
      newButton.addEventListener("click", window[buttonFunction]);
    }
    // console.log(buttonFunction);

    document.querySelector("#" + rowToMake).appendChild(newButton); // Append the node
  }
};

buildRow(buttonRow1, "firstRow");
buildRow(buttonRow2, "secondRow");
buildRow(buttonRow3, "thirdRow");
buildRow(buttonRow4, "fourthRow");
buildRow(buttonRow5, "fifthRow");

// if the user is entering a multi-digit number into the result window
let buildingInput = true;
let userNumber = 0;
const upperLimitNumber = 10000000;

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
  if (buildingInput && userNumber < upperLimitNumber) {
    userNumber = userNumber.toString() + number.toString();
    userNumber = parseFloat(userNumber);
    // console.log(4 / 7);
    updateResultWindow();
  }
}
function clearFunction() {
  userNumber = 0;
  buildingInput = true; // reset all
  updateResultWindow();
}

function addingFunction() {
  console.log("I am the addingFunction");
}

function multiplyingFunction() {
  buildingInput = false; // stops the usernumber from growing
}

function numberFunction(e) {
  //   console.log(`The ${e.currentTarget.myParam} was clicked`);
  // tell a function to build up the userNumber with this click
  buildUserNumber(e.currentTarget.myParam);
}

// function testTextReplace() {
//     const replaceThis = document.querySelector("#resultWindowA");
//     replaceThis.innerText = "2345.179";
//     //   console.log("testTextReplace() function attempt");
//   }
//   setTimeout(testTextReplace, 500);
