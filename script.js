
const modal = document.querySelector('.start-modal');
const overlay = document.querySelector('.overlay');
const playerCard = document.querySelector('.card-player');
const cardMessage = document.querySelector('.card-message');
const computerCard = document.querySelector('.card-computer');
const modalForm = modal.querySelector('form');
const playRoundSection = document.querySelector('.play-round');


modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearModal();
  clearOverlay();
  const name = e.target['player-name'].value;
  const points = e.target['match-point'].value;
  customizeGameSettings(name, points);
  startGame();
});


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



// ***********************


playRoundSection.addEventListener('click', (e) => {

  //if target is a weapon btn call RPS

  //display weapon for player

  //display weapon for computer
  displayCompWeapon()


  // update Current Round
  // update Current score
  // update Round Result

});



function callOutRockPaperScissors() {
  const gameCall = cardMessage.querySelector('.game-call');
  setTimeout(() => gameCall.textContent += 'ROCK! ', 500);
  setTimeout(() => gameCall.textContent += 'PAPER! ', 1500);
  setTimeout(() => gameCall.textContent += 'SCISSORS!', 2500);
  setTimeout(() => gameCall.textContent = '', 3500);
}

function randomlyGenerateWeapon(){
  const weapons = ['rock','paper','scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return weapons[randomIndex];
}


function createCompImgElement() {
  const randomWeapon = randomlyGenerateWeapon();
  const imgTag = document.createElement('img');
  imgTag.setAttribute('src', `assets/img/${randomWeapon}.png`);
  imgTag.setAttribute('alt', `${randomWeapon}`);
  return imgTag;
}


function displayCompWeapon() {
  const computerWeaponUI = computerCard.querySelector('.weapon-image');
  const compImgElement = createCompImgElement();
  computerWeaponUI.innerHTML = '';
  computerWeaponUI.append(compImgElement);
}









// ***********************





function customizeGameSettings(name, matchPoint) {
  updatePlayerName(name);
  updateMatchPoint(matchPoint);
}

function startGame() {
  updateCurrentRound();
  updateCurrentScore();
  game.firstPlay = false;
}


