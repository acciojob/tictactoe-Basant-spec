const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const setupDiv = document.querySelector('.setup');
const gameDiv = document.querySelector('.game');
const messageDiv = document.querySelector('.message');
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
 
let currentPlayer = 'x'; // Start with lowercase 'x'
let player1, player2;
let gameState = ['', '', '', '', '', '', '', '', ''];
 
submitBtn.addEventListener('click', () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();
 
    if (player1 && player2) {
        setupDiv.classList.add('hidden');
        gameDiv.classList.remove('hidden');
        messageDiv.textContent = `${player1}, you're up!`;
    } else {
        alert('Please enter names for both players.');
    }
});
 
board.addEventListener('click', handleCellClick);
 
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id - 1;
 
    if (cell.classList.contains('cell') && !gameState[cellIndex]) {
        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
 
        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2} congratulations you won!`;
            board.removeEventListener('click', handleCellClick);
        } else if (gameState.includes('')) {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Toggle between lowercase 'x' and 'o'
            messageDiv.textContent = `${currentPlayer === 'x' ? player1 : player2}, you're up!`;
        } else {
            messageDiv.textContent = 'It\'s a draw!';
        }
    }
}
 
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
 
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}