//GAMEBOARD (we only need one instance of it, thus we should make a factory function and IMMEDIATELY invoke it using an IIFE)
const gameBoard = (function (){
    const rows = 3;
    const cols = 3;
    const board = [];
    

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < cols; j++){
            board[i].push("0")
        }
    }

    const getBoard = () => board;

    const placeMark = (row, col, player) => {
        if(board[row][col] === "0" && (0 < row < 2) && (0 < col < 2)){
            board[row][col] = player.playerMark;
        }
        else{
            console.log("invalid move");
            return
        }
    }
    
    const printBoard = () => {
        // for(let i = 0; i < rows; i++){
        //     for(let j = 0; j < cols; j++){
        //         console.log("row: " + i + " " + "col: " + j + " " + board[i][j]);
        //     }
        // }
        console.table(board)
      };

      return {getBoard, placeMark, printBoard}
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
        console.log(`Placing ${getActivePlayer().playerMark} for ${getActivePlayer().name}.`)
        board.placeMark(row, col, activePlayer);



        switchTurns();
        printNewRound();
    }
    
    printNewRound()

    return {playRound, getActivePlayer}

})()

