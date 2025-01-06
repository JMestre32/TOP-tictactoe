// Store the gameboard as an array inside of a gameBoard object

const gameBoard = (() => {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    const getBoard = () => board;
    
    const updateBoard = (row, col, mark) => {
        if(board[row][col] === ""){
            board[row][col] = mark;
            return true
        }
        return false;
    };

    const resetBoard = () => {
        board = [
            ["","",""],
            ["","",""],
            ["","",""]
        ];
    };
    return {getBoard, updateBoard, resetBoard}
})();

// Players are also going to be stored in objects

const createPlayer = (name, player) => {
    if(player === 1){
        symbol = 'X'
    }
    else if(player ===2){
        symbol = 'O'
    }
    else{
        console.log("this is a 2 player game.")
    }

    return{
        name, 
        symbol
    }
}

const player1 = createPlayer('jacob', 1)
const player2 = createPlayer('alex', 2)
// const player3 = createPlayer('bob', 3)
// Create an object to control the flow of the game itself

const gameFlow = (() => {
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const playTurn = (row, col) => {
        if(gameBoard.updateBoard(row, col, currentPlayer.symbol)){
            if (checkWin(currentPlayer.symbol)){
                console.log(`${currentPlayer.name} wins!`)
                return;
            }
            if(isBoardFull()){
                console.log("It's a tie!");
                return;
            }
            switchPlayer();
            } else{
                console.log("Invalid move. Try again.")
            }
    };

    const checkWin = (symbol) => {
        const board = gameBoard.getBoard();

        const winCons = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        return winCons.some(pattern => pattern.every(cell => cell === symbol));
    }

    const isBoardFull = () => {
        return gameBoard.getBoard().every(row => row.every(cell => cell !== ""));
    };
    
    return {playTurn};
})();

game1 = gameFlow