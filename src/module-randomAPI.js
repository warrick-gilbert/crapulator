// Gets a random word for use in the crapulator
let randomWord = "test random word";
const baseURL = "https://random-words-api.vercel.app/";
const parameters = "word/";

// fetch returns a "readable stream" of info, we need to use the .json() method to pull out the data, and convert it into a JS object
function convertToJSObject(res) {
  return res.json(); // takes JSON, converts to JS object, this is another promise
}

function handleData(data) {
  randomWord = data[0].word;
  // console.log(`randomWord is: ${randomWord}`);
  return randomWord;
}

function fetchData() {
  const res = fetch(baseURL + parameters)
    .then(convertToJSObject)
    .then(handleData)
    .catch((e) => {
      console.log(e);
    });
  return res;
}

export default fetchData; // another way of specifying which parts are to be executed
