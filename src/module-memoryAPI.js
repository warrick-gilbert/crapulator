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

let memoryCreated = false; // changed once the user creates their first memory

export function handleMemoryPlusClick(valueToPass) {
  let data = { crapulatorRemembers: valueToPass };
  let fetchData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
      "X-Master-Key": API_Key,
      "X-Bin-Name": "test",
    }),
  };

  function convertToJSObject(res) {
    return res.json();
  }

  function handleData(data) {
    memoryCreated = false;
    console.log(`a new bin was created at jsonbin.io at ${data.metadata.id}`);
    console.log(data);
  }

  fetch(endPoint, fetchData).then(convertToJSObject).then(handleData);
}

// handleMemoryPlusClick(); // call the memory API
