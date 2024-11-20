let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes("") ? null : "draw";
}

function handleCellClick(event) {
  const cellIndex = event.target.id - 1;

  if (!isGameActive || board[cellIndex]) return;

  board[cellIndex] = currentPlayer === player1 ? "X" : "O";
  event.target.textContent = board[cellIndex];
  event.target.classList.add("taken");

  const winner = checkWinner();

  if (winner === "X" || winner === "O") {
    document.querySelector(".message").textContent = 
      `${currentPlayer} congratulations you won!`;
    isGameActive = false;
  } else if (winner === "draw") {
    document.querySelector(".message").textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector(".message").textContent = 
      `${currentPlayer}, you're up`;
  }
}

function initializeGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", handleCellClick);
  });

  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = player1;
  document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
}

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  document.getElementById("player-input").style.display = "none";
  document.getElementById("game-board").style.display = "block";

  initializeGame();
});
