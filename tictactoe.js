//GAMEBOARD (we only need one instance of it, thus we should make a factory function and IMMEDIATELY invoke it using an IIFE)
const gameBoard = (function (){
    const rows = 3;
    const cols = 3;
    const board = [];
    
    //Initialize the board with 0's
    const resetBoard = () =>
            {
            for (let i = 0; i < rows; i++){
                board[i] = [];
                for(let j = 0; j < cols; j++){
                    board[i].push("0")
                }
            }
        }

    const getBoard = () => board;

    const placeMark = (row, col, player) => {
        if (board[row][col] === "0" && row >= 0 && row <= 2 && col >= 0 && col <= 2)
            {
            board[row][col] = player.playerMark;
            //flag to check if a valid move was made
            return true
        }
        else{
            console.log("invalid move, try again");
            return false
        }
    }

    const checkWin = () => {
        if(
            board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X" ||
            board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X" ||
            board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X" ||
            board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X" ||
            board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X" ||
            board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X" ||
            board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X" ||
            board[0][2] == "X" && board [1][1] == "X" && board[2][0] == "X"

        ){
            return true
        }
        else if(
            board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O" ||
            board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O" ||
            board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O" ||
            board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O" ||
            board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O" ||
            board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O" ||
            board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O" ||
            board[0][2] == "O" && board [1][1] == "O" && board[2][0] == "O"){
                return true
            }

        else{
            return false
        }

        
    }

    const isMarked = (currentMark) => {
        return currentMark !== "0"
    }

    const checkTie = () => board.every(row => row.every(isMarked));

    
    const printBoard = () => {
        //prints a table visualization of the board
        console.table(board)
      };

      return {getBoard, placeMark, printBoard, resetBoard, checkWin, checkTie}
})()

//PLAYER
function createPlayer(name, pNumber){
    return{
        name: name,
        playerMark : pNumber === "1" ? "X" : "O",

    }
}

player1 = createPlayer("player 1", "1");
player2 = createPlayer("player 2", "2");


//GAME CONTROLLER/FLOW

const game = (function (){

    const board = gameBoard
    const players = [
        player1, 
        player2
    ];

    let activePlayer = players[0];

    const switchTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, col) => {

        if(!(board.placeMark(row, col, activePlayer))){
            return
        }
        else
        {
            if(board.checkWin()){
                board.printBoard()
                console.log(`${getActivePlayer().name} won! Starting new game.`)
                board.resetBoard()
                activePlayer = players[0];
                printNewRound()
                return
            }

            if(board.checkTie() && !board.checkWin()){
                board.printBoard()
                console.log("It's a tie!")
                board.resetBoard()
                activePlayer = players[0];
                printNewRound()
                return
            }
            console.log(`Placed ${getActivePlayer().playerMark} for ${getActivePlayer().name}.`)

            switchTurns();
            printNewRound();

        }
    }
    
    board.resetBoard()
    printNewRound()

    return {playRound, getActivePlayer}

})()

