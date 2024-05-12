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
        console.log(`${x} ${y} ${player}`);
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
                    return "win " + this.board[i][1];
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
                    return "win " + this.board[1][i];
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
                return "win " + this.board[1][1];
            }
        }
        if (nullSpaces === 0) {
            return "draw";
        } else {
            return "play";
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
    gameboard: new createGameboard(),
    playerOne: null,
    playerTwo: null,
    createPlayerOne: function playerOne(name) {
        this.playerOne = new player(name, "X");
    },
    createPlayerTwo: function playerOne(name) {
        this.playerTwo = new player(name, "O");
    },
};
// gameController.gameboard.setUpBoard();
gameController.createPlayerOne("test", "x");
gameController.createPlayerTwo("test2", "O");
gameController.gameboard.setcell(1, 1, gameController.playerOne.symbol);
gameController.gameboard.setcell(0, 1, gameController.playerTwo.symbol);
console.log(gameController);

function drawGrid(gridArray) {
    const grid = document.querySelector(".game");

    // gridArray.forEach((elementX) => {
    //     elementX.forEach((elementY) => {
    //         const btn = document.createElement("button");
    //         console.log("add card");
    //         btn.classList.add("cardBtn");
    //         btn.onclick = () => {
    //             console.log("clicked");
    //         };
    //         btn.textContent = elementY;
    //         grid.appendChild(btn);
    //     });
    // });
    grid.querySelectorAll("*").forEach((n) => n.remove());

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const btn = document.createElement("button");
            console.log("add card");
            btn.classList.add("cardBtn");
            btn.onclick = () => {
                gameController.gameboard.setcell(
                    i,
                    j,
                    gameController.playerOne.symbol
                );
                console.log("clicked" + i + j);
                drawGrid(gameController.gameboard.board);
            };
            btn.textContent = gridArray[i][j];
            grid.appendChild(btn);
        }
    }
}
drawGrid(gameController.gameboard.board);
