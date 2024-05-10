const gameboard = {
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
        this.checkGrid();
    },
    checkGrid: function () {
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
                    console.log("win horizontal");
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
                    console.log("win vertical");
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
                console.log("win diagonal");
            }
        }
    },
};
gameboard.setUpBoard();
gameboard.setCell(0, 2, "player one");
gameboard.setCell(1, 2, "player one");
gameboard.setCell(2, 2, "player one");

console.log(gameboard);
