const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageElement = document.querySelector('[data-winning-message]');
const winningMessageTextElement = document.querySelector('[data-winning-text]');
const restartButton = document.querySelector('.restart-button');

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessageElement.classList.remove('show-winning-message');
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        winningMessageTextElement.innerText = `${isCircleTurn ? "O" : "X"} venceu!`;
    }

    winningMessageElement.classList.add('show-winning-message');
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

const placeMark = (cell, classToApply) => {
    cell.classList.add(classToApply);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const handleClick = (e) => {
    const cell = e.target;
    const classToApply = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToApply);

    const isWin = checkForWin(classToApply);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
}

restartButton.addEventListener('click', startGame);

startGame();
