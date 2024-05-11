// creates a gameboard object
function createGameboard() {
    return {
        board: [],

        setUpBoard: function () {
            const grid = 3;
            this.board = [];
            for (let i = 0; i < grid; i++) {
                this.board.push([]);
                for (let j = 0; j < grid; j++) {
                    this.board[i].push(null);
                }
            }
        },
        setCell: function (x, y, player) {
            this.board[x][y] = player;
        },
        checkGrid: function () {
            let nullSpaces = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] === null) {
                        nullSpaces++;
                    }
                }
            }
            console.log(nullSpaces);

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
        },
        returnGrid: function () {
            return this.board;
        },
    };
}

function player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
}

const gameController = {
    gameboard: createGameboard(),
    playerOne: new player("playerOne", "X"),
    playerTwo: new player("playerTwo", "O"),
};

const gameboard = createGameboard();
gameboard.setUpBoard();
gameboard.setCell(0, 0, "x");
gameboard.setCell(1, 0, "x");
console.log(gameboard.setCell(2, 0, "o"));
console.log(gameboard.returnGrid());
console.log(gameController);
