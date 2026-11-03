
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let gameOver;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;

    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win");
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    for (let position of winningPositions) {
        let [a, b, c] = position;

        if (
            gameGrid[a] !== "" &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[b] === gameGrid[c]
        ) {
            gameInfo.innerText = `Winner - ${gameGrid[a]}`;
            gameOver = true;

            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");

            newGameBtn.classList.add("active");
            return;
        }
    }

    if (!gameGrid.includes("")) {
        gameInfo.innerText = "Game Tied!";
        gameOver = true;
        newGameBtn.classList.add("active");
    }
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "" && !gameOver) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        checkGameOver();

        if (!gameOver) {
            swapTurn();
        }
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

initGame();
