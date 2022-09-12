
const modal = document.querySelector('.start-modal');
const overlay = document.querySelector('.overlay');
const playerCard = document.querySelector('.card-player');
const cardMessage = document.querySelector('.card-message');
const computerCard = document.querySelector('.card-computer');
const modalForm = modal.querySelector('form');
const playRoundSection = cardMessage.querySelector('.play-round');


const game = {
  firstPlay: true,
  playerScore: 0,
  computerScore: 0,
  playerWeapon: null,
  computerWeapon: null,
  currentRound: 1,
  matchPoint: null,
}



modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearModal();
  clearOverlay();
  const name = e.target['player-name'].value;
  const points = Number(e.target['match-point'].value);
  game.matchPoint = points;
  customizeGameSettings(name, points);
  initializeGame();
});


playRoundSection.addEventListener('click', (e) => {
  const eventTarget = e.target;
  if (eventTarget.tagName === 'IMG' && !eventTarget.disabled) {
    updateCurrentRound();
    const clickedWeapon = e.target.id;
    displayPlayerWeapon(clickedWeapon);
    displayCompWeapon();
    const roundResult = determineRoundResult();
    displayRoundResult(roundResult)
    updateCurrentScore(roundResult);
    promptPlayerToPlayRound(roundResult);
    checkForMatchPoint(roundResult);
    game.firstPlay = false;
  }
  temporarilyDisableWeaponButtons();
});


function temporarilyDisableWeaponButtons() {
  const weaponButtons = Array.from(playRoundSection.querySelectorAll('img'));
  weaponButtons.forEach(weapon => weapon.disabled = true);
  setTimeout(enableAllWeaponButtons, 2000);
}


function enableAllWeaponButtons() {
  const weaponButtons = Array.from(playRoundSection.querySelectorAll('img'));
  weaponButtons.forEach(weapon => weapon.disabled = false);
}


cardMessage.addEventListener('click', (e) => {
  const clickedItem = e.target;
  if (clickedItem.classList.contains('play-again-btn')) location.reload();
})


function checkForMatchPoint(result) {
  const beforeMatchPoint = game.matchPoint - 1;
  const matchPoint = game.matchPoint;
  const message = cardMessage.querySelector('.message');

  if (game.playerScore === matchPoint || game.computerScore === matchPoint) {
    let winner;
    if (result === 'win') winner = 'Player';
    else if (result === 'lose') winner = 'Computer';
    endGame(winner);
  } else if (game.playerScore === beforeMatchPoint && game.computerScore === beforeMatchPoint) {
    message.textContent = 'Next round WINS the match!';
  } else if (game.playerScore === beforeMatchPoint || game.computerScore === beforeMatchPoint) {
    if (game.playerScore === beforeMatchPoint) {
      message.textContent = 'Win the next round, you win the game!';
    } else if (game.computerScore === beforeMatchPoint) {
      message.textContent = 'Lose next round, you lose the game.';
    }
  }
}

function endGame(winner) {
  hideWeaponButtons()
  hideRoundResult();
  announceWinner(winner);
  displayPlayAgainBtn();
}

function hideWeaponButtons() {
  playRoundSection.classList.add('hide');
}

function hideRoundResult() {
  const roundResultDisplay = cardMessage.querySelector('.current-round-result');
  roundResultDisplay.classList.add('hide');
}

function announceWinner(winner) {
  const promptMessage = cardMessage.querySelector('.message');
  if (winner === 'Computer') promptMessage.textContent = `Sorry, ${winner} wins the match...`;
  else promptMessage.textContent = `You win the match!`;
  promptMessage.style.fontSize = '30px'
  promptMessage.style.textShadow = '2px 2px red'
}


function displayPlayAgainBtn() {
  const playAgainSection = document.createElement('section');
  const playAgainButton  = document.createElement('button');
  playAgainSection.classList.add('play-again-section');
  playAgainButton.classList.add('play-again-btn');
  playAgainButton.textContent = 'PLAY AGAIN!'
  playAgainSection.append(playAgainButton);
  cardMessage.append(playAgainSection);
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
  if (roundResult === 'win') game.playerScore += 1;
  else if (roundResult === 'lose' ) game.computerScore += 1;
  const currentScoreUI = cardMessage.querySelector('.current-score');
  currentScoreUI.textContent = `${game.playerScore} - ${game.computerScore}`;
}

function updateCurrentRound() {
  if (!game.firstPlay) game.currentRound += 1;
  const currentRoundUI = cardMessage.querySelector('.current-round-number');
  currentRoundUI.textContent = `ROUND ${game.currentRound}`;
}


function promptPlayerToPlayRound(result) {
  const promptMessage = cardMessage.querySelector('.message');
  if (result === 'win') promptMessage.textContent = 'NO! Let\'s go again!';
  else if (result === 'lose') promptMessage.textContent = 'AHA! Let\'s go again!';
  else promptMessage.textContent = 'Go again!';
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
    currentRoundResult.textContent = 'YOU WON THIS ROUND!';
  } else if (roundResult === 'lose') {
    currentRoundResult.textContent = 'YOU LOST THIS ROUND!';
  } else {
    currentRoundResult.textContent = 'It\'s a DRAW!';
  }
}


function customizeGameSettings(name, matchPoint) {
  updatePlayerName(name);
  updateMatchPoint(matchPoint);
}

function initializeGame() {
  const currentRound = cardMessage.querySelector('.current-round-number');
  const currentScore = cardMessage.querySelector('.current-score');
  currentRound.textContent = `ROUND ${game.currentRound}`;
  currentScore.textContent = `${game.playerScore} - ${game.computerScore}`;
}



