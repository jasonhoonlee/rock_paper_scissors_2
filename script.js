
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
  firstPlay: true,
  playerScore: 0,
  computerScore: 0,
  playerWeapon: null,
  computerWeapon: null,
  currentRound: 1,
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


function updateCurrentScore(roundResult) {
  if (game.firstPlay === false) {
      if (roundResult === 'win') game.playerScore += 1;
      else if (roundResult === 'lose' ) game.computerScore += 1;
  } else {
     game.firstPlay = true;
  }
  const currentScoreUI = cardMessage.querySelector('.current-score');
  currentScoreUI.textContent = `${game.playerScore} - ${game.computerScore}`;
}

function updateCurrentRound() {
  if (game.firstPlay === false) {
    game.currentRound += 1;
  } else {
    game.firstPlay = false ;
  }
  const currentRoundUI = cardMessage.querySelector('.current-round-number');
  currentRoundUI.textContent = `ROUND ${game.currentRound}`;
}


playRoundSection.addEventListener('click', (e) => {

  if ( e.target.tagName === 'IMG') {
    //display weapon for player
    const clickedWeapon = e.target.id;
    displayPlayerWeapon(clickedWeapon);
    //display weapon for computer
    displayCompWeapon();

    // determine round result
    const roundResult = determineRoundResult();
    //update round result
    displayRoundResult(roundResult)
    // update Current score
    updateCurrentScore(roundResult);
    //update current round
    updateCurrentRound();
  }

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
  game.computerWeapon = randomWeapon;
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

function createPlayerImgElement(weapon) {
  game.playerWeapon = weapon;
  const imgTag = document.createElement('img');
  imgTag.setAttribute('src', `assets/img/${weapon}.png`);
  imgTag.setAttribute('alt', `${weapon}`);
  return imgTag;
}

function displayPlayerWeapon(weapon) {
  const playerWeaponUI = playerCard.querySelector('.weapon-image');
  const playerWeaponImgElement = createPlayerImgElement(weapon);
  playerWeaponUI.innerHTML = '';
  playerWeaponUI.append(playerWeaponImgElement);
}


function determineRoundResult() {
  const playerWeapon = game.playerWeapon;
  const computerWeapon = game.computerWeapon;

  switch(playerWeapon) {
    case 'rock':
      if (computerWeapon === 'paper') return 'lose';
      else if (computerWeapon === 'scissors') return 'win';
      else return 'draw';
    case 'paper':
      if (computerWeapon === 'rock') return 'win';
      else if (computerWeapon === 'scissors') return 'lose';
      else return 'draw';
    case 'scissors':
      if (computerWeapon === 'paper') return 'win';
      else if (computerWeapon === 'rock') return 'lose';
      else return 'draw';
  }
}

function displayRoundResult(roundResult) {
  const currentRoundResult = cardMessage.querySelector('.current-round-result');
  if (roundResult === 'win') {
    currentRoundResult.textContent = 'YOU WIN THIS ROUND!';
  } else if (roundResult === 'lose') {
    currentRoundResult.textContent = 'YOU LOSE THIS ROUND...';
  } else {
    currentRoundResult.textContent = 'IT\'S A DRAW THIS ROUND.';
  }
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


