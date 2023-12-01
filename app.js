// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-rules-btn");


const CHOICES = [
  {
      name: "paper",
      beats: "rock",
  },
  {
      name: "scissors",
      beats: "paper",
  },
  {
      name: "rock",
      beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
const computerScoreNumber = document.querySelector(".computer_score__number");
let computerScore = 0;
let score = 0;
const rulesBtn = document.querySelector(".rules-btn");
const rulesContent = document.querySelector(".rules-content");
const closeRulesBtn = document.querySelector(".close-rules-btn");
let startTime = localStorage.getItem('startTime');

function startTimer(){
  if (!startTime) {
      startTime = new Date().getTime();
      localStorage.setItem('startTime', startTime);
      updateElapsedTime();
  }
}
function updateElapsedTime() {
  const currentTime = new Date().getTime();
  const elapsedTimeInSeconds = Math.floor((currentTime-startTime)/1000);

 const hours = Math.floor(elapsedTimeInSeconds / 3600);
 const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;

  document.getElementById('elapsed-time').innerText = `Time spent: ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateElapsedTime, 1000);
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('startTime');
});

function updateScore(point){
  alert("Congratulations! You won this round!");
}



// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
      startTimer();
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
  });
});
rulesBtn.addEventListener("click", () => {
  rulesContent.classList.remove("hidden");
 
});

closeRulesBtn.addEventListener("click", () => {
  rulesContent.classList.add("hidden");
 
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
          resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
              <img src="icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
          `;
      }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());

      if (userWins) {
          resultText.innerText = "you win";
          resultDivs[0].classList.toggle("winner");
          keepScore(1);
      } else if (aiWins) {
          resultText.innerText = "you lose";
          resultDivs[1].classList.toggle("winner");
          keepScore(-1);
      } else {
          resultText.innerText = "draw";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

playAgainBtn.addEventListener("click", () => {
  resetGame();
});

function isWinner(results) {
  return results[0].beats === results[1].name;
}
function showCongratulationMessage() {
  alert("Congratulations! You won this round!");
  playAgainBtn.innerText = "Play Again";
}
function showSorryMessage() {
  alert("Sorry! You lost this round!");
  playAgainBtn.innerText = "Play Again";
}
function keepScore(point) {
  if (point > 0) {
      score += point;
      scoreNumber.innerText = score;
      showCongratulationMessage();
  } else if (point < 0) {
      computerScore += Math.abs(point);
      computerScoreNumber.innerText = computerScore;
      showSorryMessage();
  }
}


function resetGame() {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
}
// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
