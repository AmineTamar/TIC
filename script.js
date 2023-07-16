let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let resetBoardBtn = document.getElementById('resetBoardBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');


const O_TEXT = "O";
const X_TEXT = "X";

let player1Score = 0;
let player2Score = 0;
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let gameInProgress = true;
let moveCount = 0;
let lastMoveSound;

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (gameInProgress && !spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    e.target.classList.add('pencil-like'); // Apply pencil-like font class

    moveCount++;

    if (lastMoveSound && !lastMoveSound.paused) {
      lastMoveSound.pause(); // Pause the previous audio
      lastMoveSound.currentTime = 0; // Reset the playback position
    }
     // Play the sound effect
     const moveSound = document.getElementById('moveSound');
     moveSound.play();

     lastMoveSound = moveSound;
 
    

    if (playerHasWon() !== false) {
      gameInProgress = false; 
      playerText.innerText = `${currentPlayer}  hat gewonnen!`;
      let winning_blocks = playerHasWon();
      winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);

      if (currentPlayer === X_TEXT) {
        player1Score++;
        document.getElementById("player1Score").innerText = player1Score;
      } else {
        player2Score++;
        document.getElementById("player2Score").innerText = player2Score;
      }

      return;
    } else if (moveCount === 9) {
      gameInProgress = false;
      playerText.innerText = "Unentschieden";
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    playerText.innerText = `Spieler ${currentPlayer} ist dran`;
  }
}

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function playerHasWon() {
  for (const condition of winCondition) {
    let [a, b, c] = condition;
    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
       // Play the winning sound effect
    const winSound = document.getElementById('winSound');
    winSound.play();
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener('click', restart);
resetBoardBtn.addEventListener('click', resetBoard);

function restart() {
  resetBoard();
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1Score").innerText = player1Score;
  document.getElementById("player2Score").innerText = player2Score;
}

function resetBoard() {
  spaces.fill(null);
  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
    document.getElementById("h3").innerHTML = '';
  });

  currentPlayer = X_TEXT;
  playerText.innerText = `Spieler ${currentPlayer} ist dran`;

  gameInProgress = true;
  moveCount = 0;
}

startGame();