
const modal = document.querySelector('.start-modal');
const overlay = document.querySelector('.overlay');
const playerCard = document.querySelector('.card-player');
const cardMessage = document.querySelector('.card-message');
const modalForm = modal.querySelector('form');
// const playRoundBtn = document.querySelector('.play-round-btn');



modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearModal();
  clearOverlay();
  const name = e.target['player-name'].value;
  const points = e.target['match-point'].value;
  customizeGameSettings(name, points);
  startGame();
});


// playRoundBtn.addEventListener('click', () => {

//   //call out R,P,S
//   callOutRockPaperScissors();
//   setTimeout(() => {

//     //randomlyGenerateWeapons
//     //displayWeapons
//     //determineWinner
//     //displayRoundResult

//     updateCurrentRound();
//     updateCurrentScore(winner);
//     updatePlayButton();

//   }, 3500)

// });


const game = {
  playerScore: 0,
  computerScore: 0,
  currentRound: 1,
  firstPlay: true,
}


function clearModal() {
  modal.classList.remove('on');
  modal.style.display = 'none';
}

function clearOverlay() {
 overlay.classList.remove('on');
}

function updatePlayerName(name) {
  const playerCardName = playerCard.querySelector('h2');
  playerCardName.textContent = `${name}`;
}

function updateMatchPoint(matchPoint) {
  const matchPointSetting = cardMessage.querySelector('.match-point');
  matchPointSetting.textContent = `Match Point: ${matchPoint}`;
}


function updatePlayButton() {
  if (!game.firstPlay) {
    const playRoundBtn = modal.querySelector('.play-round-btn');
    playRoundBtn.textContent = 'Play next round';
  }
}

function updateCurrentScore(winner) {
  if (!game.firstPlay) {
    if (winner === 'player') game.playerScore += 1;
    else game.computerScore += 1;
  }

  const currentScoreUI = cardMessage.querySelector('.current-score');
  currentScoreUI.textContent = `${game.playerScore} - ${game.computerScore}`;
}

function updateCurrentRound() {
  if (!game.firstPlay) game.currentRound += 1;

  const currentRoundUI = cardMessage.querySelector('.current-round-number');
  currentRoundUI.textContent = `Current round: ${game.currentRound}`;
}


function callOutRockPaperScissors() {
  const gameCall = cardMessage.querySelector('.game-call');
  setTimeout(() => gameCall.textContent += 'ROCK! ', 500);
  setTimeout(() => gameCall.textContent += 'PAPER! ', 1500);
  setTimeout(() => gameCall.textContent += 'SCISSORS!', 2500);
  setTimeout(() => gameCall.textContent = '', 3500);
}


function randomlyGenerateWeapons(){
  const weapons = ['rock','paper','scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return weapons[randomIndex];
}


function customizeGameSettings(name, matchPoint) {
  updatePlayerName(name);
  updateMatchPoint(matchPoint);
}

function startGame() {
  updateCurrentRound();
  updateCurrentScore();
  game.firstPlay = false;
}


