const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Create board
function createBoard() {
  board.innerHTML = "";
  cells = [];

  gameState.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
    cells.push(cell);
  });
}

// Handle player move
function handleClick(index) {
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  if (checkWinner()) return;

  currentPlayer = "O";
  setTimeout(computerMove, 500);
}

// Computer move (random)
function computerMove() {
  let empty = gameState
    .map((val, i) => val === "" ? i : null)
    .filter(v => v !== null);

  if (empty.length === 0) return;

  let randomIndex = empty[Math.floor(Math.random() * empty.length)];
  gameState[randomIndex] = "O";
  cells[randomIndex].innerText = "O";

  if (checkWinner()) return;

  currentPlayer = "X";
}

// Check winner
function checkWinner() {
  for (let condition of winConditions) {
    let [a, b, c] = condition;

    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      statusText.innerText = `${gameState[a]} Wins!`;
      gameActive = false;
      return true;
    }
  }

  if (!gameState.includes("")) {
    statusText.innerText = "Draw!";
    gameActive = false;
    return true;
  }

  return false;
}

// Reset game
function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.innerText = "";
  createBoard();
}

// Initialize
createBoard();