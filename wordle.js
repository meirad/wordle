import { WORDS } from './your-script.js';

let selectedWord = getRandomWord();
let guessedWord = Array(selectedWord.length).fill('_'); 
let guessCount = 1;
let maxAttempts = 6;
let wins = localStorage.getItem('wins') ? parseInt(localStorage.getItem('wins')) : 0;
let losses = localStorage.getItem('losses') ? parseInt(localStorage.getItem('losses')) : 0;

let resetButton = document.getElementById('reset');

document.getElementById('showInstructions').addEventListener('click', () => document.getElementById('instructions').showModal());
document.getElementById('startgame').addEventListener('click', () => document.getElementById('instructions').close());
document.getElementById('checkInput').addEventListener('click', checkGuess);
document.getElementById('reset').addEventListener('click', resetGame);

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkGuess(); 
    }
});

function getRandomWord() {
    let randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}


console.log(selectedWord);

function updateDisplay(letter) {
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) guessedWord[i] = letter;
    }
    return guessedWord.join('');
}


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
        box.classList.add(selectedWord[i] === userInput.value[i] ? 'right' : selectedWord.includes(userInput.value[i]) ? 'wrong' : 'empty');
        grid.appendChild(box);
    }
  
    return validWord;
}


function checkGuess() {
  let userTest = checkInput();
  const guessButton = document.getElementById("checkInput");
  const wordInput = document.getElementById("wordInput");

  // If the word is not valid, return early
  if (!userTest) {
    event.preventDefault();
    return;
  }

  if (userTest === selectedWord) {
      document.getElementById('message').innerHTML = "Well done! You've guessed the word correctly!";
      guessButton.remove();
      resetButton.style.display = "block";
      wins++;
      localStorage.setItem('wins', wins);
  } else if (guessCount < maxAttempts) {
      document.getElementById('message').innerHTML = `Oops! That's not correct. Try again. You have ${guessCount} out of ${maxAttempts} attempts left.`;
      
      guessCount++;
  } else {
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

  document.getElementById('wins').textContent = `Wins: ${wins}`;
  document.getElementById('losses').textContent = `Losses: ${losses} `;
}

updateScoreboard();



function resetGame(){
  location.reload();
  guessCount = 0;
  selectedWord = getRandomWord();
  document.getElementById('message').innerHTML = "";
  document.getElementById('wordInput').value = "";
  document.getElementById('checkInput').style.display = "block";
  resetButton.style.display = "none";

  updateScoreboard();
}

resetButton.addEventListener('click', resetGame);