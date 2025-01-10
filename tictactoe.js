// Store the gameboard as an array inside of a gameBoard object

let gameBoard = (function () {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]

    return{
        
        getBoard : function() {
            return board
        },

        playTurn : function (row, col, player){
            if(board[row][col] === " "){
                board[row][col] = player.mark
                return true
            }
            else{
                console.log("Invalid move try again")
                return false
            }
        },

        printBoard : function(){
            console.table(board)
        },

        resetBoard : function(){
            board = [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]
            ]
        },

        checkWin : function(activePlayer){
            if(
                // Rows
                board[0][0] === activePlayer.mark && board[0][1] === activePlayer.mark && board[0][2] === activePlayer.mark ||
                board[1][0] === activePlayer.mark && board[1][1] === activePlayer.mark && board[1][2] === activePlayer.mark ||
                board[2][0] === activePlayer.mark && board[2][1] === activePlayer.mark && board[2][2] === activePlayer.mark ||
                // Cols
                board[0][0] === activePlayer.mark && board[1][0] === activePlayer.mark && board[2][0] === activePlayer.mark ||
                board[0][1] === activePlayer.mark && board[1][1] === activePlayer.mark && board[2][1] === activePlayer.mark ||
                board[0][2] === activePlayer.mark && board[1][2] === activePlayer.mark && board[2][2] === activePlayer.mark ||
                // Diag
                board[0][0] === activePlayer.mark && board[1][1] === activePlayer.mark && board[2][2] === activePlayer.mark ||
                board[0][2] === activePlayer.mark && board[1][1] === activePlayer.mark && board[2][0] === activePlayer.mark
            ){
                console.log(`${activePlayer.name} wins!`)
                this.resetBoard()
            }
        }
        
    }
})();

// Players are also going to be stored in objects

function createPlayer(name, player){
    if(player === 1){
        mark = 'X'
    }
    else if(player ===2){
        mark = 'O'
    }
    else{
        console.log("this is a 2 player game.")
    }

    return{
        name, 
        mark
    }
}

// const player1 = createPlayer('jacob', 1)
// const player2 = createPlayer('alex', 2)
// const player3 = createPlayer('bob', 3)
// Create an object to control the flow of the game itself

function gameController(player1, player2){
    let activePlayer = player1;

    const board = gameBoard;


    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };
    const getActivePlayer = () =>{
        return activePlayer
    }

    const printNewRound = () =>{
        board.printBoard();
        console.log(`${activePlayer.name}'s Turn!`);
    }

    const playRound = (row, col) =>{
        console.log(`Placing an ${activePlayer.mark} in position [${row}][${col}].`)

        let validity = board.playTurn(row, col, activePlayer);
        
        if(validity){
            // Checking for a winner
            board.checkWin(activePlayer)


            switchPlayerTurn();
            printNewRound();

        }
        else{
        }
    }

    return{
        playRound,
        getActivePlayer
    };


}

let game;

const htmlGame = document.getElementById('board')
const rows = 3;
const cols = 3;

for(let i = 0; i < rows; i++){
    for(let j = 0; j <  cols; j++){
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        htmlGame.appendChild(cell)
    }
}
/*
NEXT STEPS: 

1. Make gameFlow a factory function instead of an IIFE 
2. Make the UI 
3. Make an IIFE displayController for the UI
 */
