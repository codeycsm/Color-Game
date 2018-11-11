let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let difficultyButtons = document.querySelectorAll('.difficulty');



init();

function init(){
    // Difficulty function
    setDifficulty();
    // Sets up squares and user guesses
    setSquares();
    // Resets game.
    reset();
}

function setDifficulty(){
    for(let i = 0; i < difficultyButtons.length; i++){
        difficultyButtons[i].addEventListener('click', function(){
            difficultyButtons[0].classList.remove('selected');
            difficultyButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setSquares(){
    // Sets squares with colors, event listeners, and user guess.
    for(let i = 0; i < squares.length; i++){
        // add initial colors
        squares[i].style.backgroundColor = colors[i];
    
        // add click listeners to squares
        squares[i].addEventListener('click', function(){
            // grab color clicked on 
            let clickedColor = this.style.backgroundColor;
            // compare clicked color to winning color;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct!';
                resetButton.textContent = 'Play Again?';
                changeColors(clickedColor);
            }else{
                this.style.background = '#232323';
                messageDisplay.textContent = 'Try Again!';
            }
        });
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();  
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = 'New Colors';
    messageDisplay.textContent = '';
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = 'none';
        }
    }
    h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', function(){
    reset();
});



function changeColors(color) {
    // loop through all colors
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

function pickColor(){
   let random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

function generateRandomColors(num){
    // make an array
    let arr = [];
    // repeat num of times
    for(let i  = 0; i < num; i++) {
        arr.push(randomColor());
    }
    // return colors array
    return arr;
}

function randomColor(){
    // pick a red from 0 - 255
    let r = Math.floor(Math.random() * 256);
    // pick a green from 0 - 255
    let g = Math.floor(Math.random() * 256);
    // pick a blue from 0 - 255
    let b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}