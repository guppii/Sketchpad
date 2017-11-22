/**************************************
      generic helper functions
***************************************/
function isInteger (num) {
  return !isNaN(num) && num % 1 === 0
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function generateRandomRGBVal() {
  return getRandomIntInclusive(0, 255);
}

//create a CSS rgb function call since JS doesn't support it
function rgb (r, g, b){
  if (!isInteger(r) || r < 0 || r > 255) r = 0;
  if (!isInteger(g) || r < 0 || r > 255) g = 0;
  if (!isInteger(b) || r < 0 || r > 255) b = 0;
  return "rgb(" + r + ","+ g + "," + b + ")";
}

/**************************************
          app functions
***************************************/
function createGridElement (width, height) {
  let newGridElement = document.createElement('div');
  newGridElement.classList.add("gridElement");
  newGridElement.classList.add("gridElementDefaultState");
  newGridElement.style.width = width +'px';
  newGridElement.style.height = height +'px';
  newGridElement.style.float = 'left';
  return newGridElement;
}

function changeGridElementColor (e) {
  let r = generateRandomRGBVal();
  let g = generateRandomRGBVal();
  let b = generateRandomRGBVal();
  console.log(r);
  e.target.style.background = rgb(r,g,b);
}

function resetGrid () {
  gameWindow.innerHTML = '';
  for (var i = 0; i < numGridElementsPerRow; i++){
    for(var j = 0; j < numGridElementsPerRow; j++){
      let newGridElement = createGridElement(widthGridElement, heightGridElement)
      newGridElement.addEventListener("mouseover", changeGridElementColor);
      gameWindow.appendChild(newGridElement);
    }
  } 
}

function restart (e) {
  //retrieve new num elements
  let numElements = prompt("How many squares per side?", "4");

  //validate entry
  /*note:
           I don't like rerunning the validation checks in this code
           but I'd like to return an error message to the user.
           If the validation checks are changed this won't fail;
           it just won't return a specific message. 
           I could possibly change the validation function to
           return an error message
  */
  if (!validateNumGridElementsPerRow(numElements)) {
    //determine the error
    let errorMessage = "";
    if (!isInteger(numElements)) 
      errorMessage = " (Not an integer)";
    else if (numElements < minGridElementsPerRow)
      errorMessage = " (Number < " + minGridElementsPerRow + ")";
    else if (numElements > maxGridElementsPerRow)
      errorMessage = " (Number > " + maxGridElementsPerRow + ")";

    alert("Invalid entry." + errorMessage + " Setting to default value");
    numElements = defaultGridElementsPerRow;
  }
  setNumGridElementsPerRow(numElements);
  resetGrid();
}

function setNumGridElementsPerRow (numElements) {
  if (!validateNumGridElementsPerRow(numElements)) 
    numElements = defaultGridElementsPerRow;
  numGridElementsPerRow = numElements;
  refreshGridNumDependentSettings();
}

function validateNumGridElementsPerRow (numElements) {
  return isInteger(numElements) 
      && numElements >= minGridElementsPerRow
      && numElements <= maxGridElementsPerRow;
}

function refreshGridNumDependentSettings () {
  //i had to subtract 1 in the below function to keep rounding errors from
  //occasionally causing elements to spill over into the wrong row
  widthGridElement = ((gameWindow.clientWidth - 1) / numGridElementsPerRow);
  heightGridElement = widthGridElement;
}
/**************************************
              main
***************************************/
//declare variables
const gameWindow = document.querySelector('#gameWindow');
const clearButton = document.querySelector('#clearButton');
const maxGridElementsPerRow = 100;
const minGridElementsPerRow = 1;
const defaultGridElementsPerRow = 4;
let numGridElementsPerRow = 0;
let widthGridElement = 0;
let heightGridElement = 0;

//initialize variables
setNumGridElementsPerRow(4);

//add event listeners
clearButton.addEventListener("click", restart);

//initialize the grid elements and add to gameWindow
resetGrid();

console.log(heightGridElement);