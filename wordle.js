
import { WORDS } from './your-script.js';
 
document.getElementById('showInstructions').addEventListener('click', function() {
  document.getElementById('instructions').showModal();
});

function instructions() {
  document.getElementById('instructions').close();
}

document.getElementById('startgame').addEventListener('click', instructions);

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
  
  if (!validWord) {
    alert('Please enter a valid letter');
    return;
  }
  
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
}



const restbutton = document.getElementById("reset");
restbutton.style.display = "none";

let wins = 0;
let losses = 0;

function checkGuess() {
  let userTest = checkInput();
  const guessButton = document.getElementById("checkInput");
  const wordInput = document.getElementById("wordInput");
  
  if (userTest === selectedWord) {
    document.getElementById('message').innerHTML = "Well done! You've guessed the word correctly!";
    wins++;
    localStorage.setItem('wins', wins);
  }
  else if (guessCount < maxAttempts) {
    document.getElementById('message').innerHTML = "Oops! That's not correct. Try again.";
    guessCount++;
  }
  else {
    document.getElementById('message').innerHTML = "Game over! You've reached the maximum number of guesses.";
    wordInput.disabled = true;
    guessButton.remove();     
    resetButton.style.display = "block";
    losses++;
    localStorage.setItem('losses', losses);
  }

  wordInput.value = ""; 
  updateScoreboard(); 
}

function updateScoreboard() {
  document.getElementById('wins').textContent = "Wins: " + localStorage.getItem('wins');
  document.getElementById('losses').textContent = "Losses: " + localStorage.getItem('losses');
}
console.log(updateScoreboard());

let button = document.getElementById('checkInput');
button.addEventListener('click', checkGuess);

document.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          event.preventDefault();
          checkGuess(); 
      }
    });


    function resetGame(){
      let reset = document.getElementById('reset');
      reset.style.display = "none";
      location.reload();
      // Reset game state
      guessCount = 0;
      selectedWord = chooseNewWord(); // replace this with your function to choose a new word
    
      // Reset game display
      document.getElementById('message').innerHTML = "";
      document.getElementById('wordInput').value = "";
      document.getElementById('checkInput').style.display = "block";
      document.getElementById('resetButton').style.display = "none";
    }

    let resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetGame);

