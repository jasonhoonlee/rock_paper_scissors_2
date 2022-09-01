
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

function customizeGameSettings(name, matchPoint) {
  updatePlayerName(name);
  updateMatchPoint(matchPoint);
}

