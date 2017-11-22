/**************************************
      generic helper functions
***************************************/
function isInteger (num){
  return !isNaN(num) && num % 1 === 0
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function generateRandomRGBVal(){
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
function createGridElement (width, height){
    let newGridElement = document.createElement('div');
    newGridElement.classList.add("gridElement");
    newGridElement.style.width = width +'px';
    newGridElement.style.height = height +'px';
    newGridElement.style.float = 'left';
    return newGridElement;
}

function changeGridElementColor (e){
  let r = generateRandomRGBVal();
  let g = generateRandomRGBVal();
  let b = generateRandomRGBVal();
  console.log(r);
  e.target.style.background = rgb(r,g,b);
}

/**************************************
              main
***************************************/
//initialize variables
const gameWindow = document.querySelector('#gameWindow');
let numGridElementsPerRow = 4;
let widthGridElement = (gameWindow.clientWidth / numGridElementsPerRow);
let heightGridElement = widthGridElement;

//initialize the grid elements and add them to the game board
for (var i = 0; i < numGridElementsPerRow; i++){
  for(var j = 0; j < numGridElementsPerRow; j++){
    let newGridElement = createGridElement(widthGridElement, heightGridElement)
    newGridElement.addEventListener("mouseover", changeGridElementColor);
    gameWindow.appendChild(newGridElement);
  }
}
console.log(heightGridElement);