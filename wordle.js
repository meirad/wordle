
  import { WORDS } from './your-script.js';
 

function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * WORDS.length);
    console.log(randomIndex);
    console.log(WORDS[randomIndex]);
    return WORDS[randomIndex];
}

let selectedWord = getRandomWord();
let guessedWord = Array(selectedWord.length).fill('_'); 
let attempts = 0;
let maxAttempts = 5;

function updateDisplay (letter) {
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) { 
      guessedWord[i] = letter; 
    }
  }
  return guessedWord.join('');
}
let guessCount = 0;
function checkInput() {
  let userInput = document.getElementById('wordInput');
  let validWord = userInput.value;
  if (validWord.length !== 5) {
      alert('Please enter a word with exactly 5 letters');
      return;
  }
  if (validWord) {
      document.getElementById('message').innerHTML = validWord;
      
      let grid = document.querySelector('#game .grid');

      for (let i = 0; i < userInput.value.length; i++) {
          let box = document.createElement('div');
          box.className = 'box';
          box.textContent = userInput.value[i];
          
          if (selectedWord[i] === userInput.value[i]) {
            box.classList.add('right');
        } else if (selectedWord.includes(userInput.value[i])) {
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }

          grid.appendChild(box);
      }
      return validWord;
  } else {
      alert('Please enter a valid letter');
  }
}





function checkGuess() {
    let userTest = checkInput();
    const button = document.getElementById("guessButton");
  
    if (userTest === selectedWord) {
        document.getElementById('message').innerHTML = "Well done! You've guessed the word correctly!";
    } else if (guessCount < maxAttempts) {
        document.getElementById('message').innerHTML = "Oops! That's not correct. Try again.";
        guessCount++;
    } else {
        document.getElementById('message').innerHTML = "Game over! You've reached the maximum number of guesses.";
        button.remove();
        guessCount = 0; // reset guessCount
    }
}
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          checkGuess(); // Call the function you want to trigger when "Enter" is pressed
      }
    });
  

    function resetGame(){
      let reset = document.getElementById('reset');
      reset.style.display = "none";
          location.reload();
    }