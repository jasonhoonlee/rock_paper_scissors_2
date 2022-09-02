
const modal = document.querySelector('.start-modal');
const overlay = document.querySelector('.overlay');
const playerCard = document.querySelector('.card-player');
const cardMessage = document.querySelector('.card-message');
const modalForm = modal.querySelector('form');




modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearModal();
  clearOverlay();
  const name = e.target['player-name'].value;
  const points = e.target['match-point'].value;
  customizeGameSettings(name, points);
})


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
  if (game.firstPlay === false) {
    const playRoundBtn = modal.querySelector('.play-round-btn');
    playRoundBtn.textContent = 'Play next round';
  }
}


function updateCurrentScore(winner) {
  const currentScoreUI = cardMessage.querySelector('.current-score');
  if (!game.firstPlay) {
    if (winner === 'player') game.playerScore += 1;
    else game.computerScore += 1;
  }
  currentScoreUI.textContent = `${game.playerScore} - ${game.computerScore}`;
}

function updateCurrentRound() {
  if (game.firstPlay === false) game.currentRound += 1;
  else game.firstPlay = false;

  const currentRoundUI = cardMessage.querySelector('.current-round-number');
  currentRoundUI.textContent = `Current round: ${game.currentRound}`;
}




function customizeGameSettings(name, matchPoint) {
  updatePlayerName(name);
  updateMatchPoint(matchPoint);
}

