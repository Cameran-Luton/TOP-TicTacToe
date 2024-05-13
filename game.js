// creates a gameboard object
function createGameboard() {
    this.board = [];
    this.setUpBoard = function setUpBoard() {
        const grid = 3;
        this.board = [];
        for (let i = 0; i < grid; i++) {
            this.board.push([]);
            for (let j = 0; j < grid; j++) {
                this.board[i].push(null);
            }
        }
    };

    this.setcell = function setcell(x, y, player) {
        this.board[x][y] = player;
    };

    this.checkGrid = function checkGrid() {
        let nullSpaces = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === null) {
                    nullSpaces++;
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (
                this.board[i][0] !== null &&
                this.board[i][1] !== null &&
                this.board[i][2] !== null
            ) {
                if (
                    this.board[i][0] == this.board[i][1] &&
                    this.board[i][1] == this.board[i][2]
                ) {
                    return this.board[i][1];
                }
            }
            if (
                this.board[0][i] !== null &&
                this.board[1][i] !== null &&
                this.board[2][i] !== null
            ) {
                if (
                    this.board[0][i] == this.board[1][i] &&
                    this.board[1][i] == this.board[2][i]
                ) {
                    return this.board[1][i];
                }
            }
        }

        if (
            (this.board[0][0] !== null &&
                this.board[1][1] !== null &&
                this.board[2][2] !== null) ||
            (this.board[0][2] !== null &&
                this.board[1][1] !== null &&
                this.board[2][0] !== null)
        ) {
            if (
                (this.board[0][0] == this.board[1][1] &&
                    this.board[1][1] == this.board[2][2]) ||
                (this.board[0][2] == this.board[1][1] &&
                    this.board[1][1] == this.board[2][0])
            ) {
                return this.board[1][1];
            }
        }
        if (nullSpaces === 0) {
            return "draw";
        }
    };

    this.returnGrid = function returnGrid() {
        return this.board;
    };
    this.setUpBoard();
}

function player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

const gameController = {
    activePlayer: "playerOne",
    gameboard: new createGameboard(),
    playerOne: null,
    playerTwo: null,
    createPlayerOne: function playerOne(name) {
        this.playerOne = new player(name, "X");
    },
    createPlayerTwo: function playerOne(name) {
        this.playerTwo = new player(name, "O");
    },
    returnActivePlayer: function () {
        if (this.activePlayer === "playerOne") {
            this.activePlayer = "playerTwo";
            return this.playerOne;
        }
        if (this.activePlayer === "playerTwo") {
            this.activePlayer = "playerOne";
            return this.playerTwo;
        }
    },
    resetGame: function () {
        this.activePlayer = "playerOne";
        this.gameboard = new createGameboard();
    },
};

function drawGrid(gridArray) {
    const title = document.querySelector(".activePlayer");
    const grid = document.querySelector(".game");
    title.textContent = `${gameController.returnActivePlayer().name}'s Turn`;
    grid.querySelectorAll("*").forEach((n) => n.remove());
    gridArray.forEach((elementX, i) => {
        elementX.forEach((elementY, j) => {
            const btn = document.createElement("button");
            btn.classList.add("cardBtn");
            btn.onclick = () => {
                if (btn.textContent === "") {
                    title.textContent = title.textContent = `${
                        gameController.returnActivePlayer().name
                    }'s Turn`;
                    gameController.gameboard.setcell(
                        i,
                        j,
                        gameController.returnActivePlayer().symbol
                    );

                    drawGrid(gameController.gameboard.board);
                    checkWin();
                }
            };
            btn.textContent = elementY;
            grid.appendChild(btn);
        });
    });
}

function checkWin() {
    if (
        gameController.gameboard.checkGrid() === gameController.playerOne.symbol
    ) {
        console.log("playerOne Wins");
        endGame("win", gameController.playerOne.name);
        // gameController.resetGame();
        // drawGrid(gameController.gameboard.board);
    }
    if (
        gameController.gameboard.checkGrid() === gameController.playerTwo.symbol
    ) {
        console.log("playerTwo Wins");
        endGame("win", gameController.playerTwo.name);
        // gameController.resetGame();
        // drawGrid(gameController.gameboard.board);
    }
    if (gameController.gameboard.checkGrid() === "draw") {
        console.log("Draw");
        endGame("draw", "none");
        // gameController.resetGame();
        // drawGrid(gameController.gameboard.board);
    }
}

function startGame() {}

function endGame(status, winner) {
    const body = document.querySelector(".body");
    const popUp = document.createElement("div");
    const msg = document.createElement("div");
    const winMsg = document.createElement("h2");
    const reset = document.createElement("button");
    popUp.classList.add("popUp");
    msg.classList.add("msg");
    winMsg.classList.add("winMsg");
    reset.classList.add("resetBtn");
    reset.textContent = "Another Round";
    reset.onclick = () => {
        gameController.resetGame();
        drawGrid(gameController.gameboard.board);
        body.removeChild(popUp);
    };
    if (status === "win") {
        winMsg.textContent = `${winner} Won`;
    }
    if (status === "Draw") {
        winMsg.textContent = `Its a draw`;
    }
    body.appendChild(popUp);
    popUp.appendChild(msg);
    msg.appendChild(winMsg);
    msg.appendChild(reset);
}

gameController.createPlayerOne("Player One", "x");
gameController.createPlayerTwo("Player Twos", "O");
console.log(gameController);

drawGrid(gameController.gameboard.board);
