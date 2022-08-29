import { updateResultWindow, updateUserNumber } from "./main";

let binID = "no memory yet"; // holds the bin ID

// 1. work out the URL and prototcol
// 2. work out the parameters
// 3. work out the method
// 4. fetch the JSON
// 5. turn it into JS object

// 1. work out the URL and prototcol
const URL = "https://api.jsonbin.io/v3";
// 2. work out the parameters
const parameters = "/b";
const API_Key = process.env.JSONBIN_ESCAPED_X_MASTER_API_KEY; // gets API key from .env
// 3. work out the method
const method = "POST";
// 4. fetch the JSON
const endPoint = URL + parameters;

// 5. turn it into JS object

export function handleMemoryPlusClick(valueToPass) {
  let data = { crapulatorMemory: valueToPass };
  let fetchData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Master-Key": API_Key,
      "X-Bin-Name": "Bin_name_goes_here",
    }),
  };

  function convertToJSObject(res) {
    return res.json();
  }

  function handleData(res) {
    // memoryCreated = false; // used?
    // need to pull out bin id from request response
    binID = res.metadata.id;
    let storedValue = res.record.crapulatorMemory;
    console.log(
      `Request response says binID is: ${binID} and storedValue is: ${storedValue}`
    );
  }

  function handleError(e) {
    console.error(`Error: `, e);
  }

  fetch(endPoint, fetchData)
    .then(convertToJSObject)
    .then(handleData)
    .catch(handleError);
}

export function handleMemoryRecallClick() {
  console.log(`binID is: ${binID} and handleMemoryRecallClick was acalled`);
  let endPointBin = endPoint + "/" + binID;
  // console.log(endPointBin);

  let fetchData = {
    method: "GET",
    headers: new Headers({
      "X-Master-Key": API_Key,
    }),
  };

  function convertToJSObject(res) {
    return res.json();
  }

  function handleData(res) {
    console.log(
      `handleData says recalled value is: ${res.record.crapulatorMemory}`
    );
    updateUserNumber(res.record.crapulatorMemory);
  }

  fetch(endPointBin, fetchData)
    .then(convertToJSObject)
    .then(handleData)
    .then(updateResultWindow);

  // updateResultWindow(); // deosn't work
}

export function handleMemoryUpdateClick(newMemoryValue) {
  console.log(`binID is: ${binID} and handleMemoryUpdateClick was acalled`);
  let objectToPass = { crapulatorMemory: newMemoryValue };

  let endPointBin = endPoint + "/" + binID;

  let fetchData = {
    method: "PUT",
    body: JSON.stringify(objectToPass),

    headers: new Headers({
      "Content-Type": "application/json",
      "X-Master-Key": API_Key,
    }),
  };

  function convertToJSObject(res) {
    return res.json();
  }

  function handleData(res) {
    console.log(
      `handleData says recalled value is: ${res.record.crapulatorMemory}`
    );
    updateUserNumber(res.record.crapulatorMemory);
  }
  fetch(endPointBin, fetchData).then(convertToJSObject).then(handleData);
}

export function handleMemoryDeleteClick() {
  // console.log(`binID is: ${binID} and handleMemoryDeleteClick was acalled`);
  // let objectToPass = { crapulatorMemory: newMemoryValue };
  let endPointBin = endPoint + "/" + binID;

  let fetchData = {
    method: "DELETE",
    // body: JSON.stringify(objectToPass),

    headers: new Headers({
      "X-Master-Key": API_Key,
    }),
  };

  function convertToJSObject(res) {
    return res.json();
  }

  function handleData(res) {
    console.log(`Message from API is: ${res.message}`);
    updateUserNumber("Memory is gone for good...");
    updateResultWindow();
  }

  fetch(endPointBin, fetchData).then(convertToJSObject).then(handleData);
}
