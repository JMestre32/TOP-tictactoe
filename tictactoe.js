

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
                    board[i].push(" ")
                }
            }
        }

    const getBoard = () => board;

    const placeMark = (row, col, player) => {
        if (board[row][col] === " " && row >= 0 && row <= 2 && col >= 0 && col <= 2)
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

    // kinda ass but the only way i know how to do it right now lmao
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
        return currentMark !== " "
    }


    const checkTie = () => board.every(row => row.every(isMarked));

    
    const printBoard = () => {
        //prints a table visualization of the board
        console.table(board)
      };

      return {getBoard, placeMark, printBoard, resetBoard, checkWin, checkTie}
})()


//PLAYER (FACTORY FUNCTION SO U CAN CREATE MULTIPLE)
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

        // Check for invalid move, if placeMark returns false return
        if(!(board.placeMark(row, col, activePlayer))){
            return
        }
        else
        {
            // check if move won the game
            if(board.checkWin()){
                board.printBoard()
                // console.log(`${getActivePlayer().name} won! Starting new game.`)
                board.resetBoard()
                activePlayer = players[0];
                printNewRound()
                return
            }

            // check if board is full and no patterns from checkWin were made
            if(board.checkTie() && !board.checkWin()){
                board.printBoard()
                // console.log("It's a tie!")
                board.resetBoard()
                activePlayer = players[0];
                printNewRound()
                return
            }

            // console.log(`Placed ${getActivePlayer().playerMark} for ${getActivePlayer().name}.`)

            switchTurns();
            printNewRound();

        }
    }
    
    // reset the board for initial game
    board.resetBoard()
    // just for the console version of the game
    printNewRound()

    return {playRound, getActivePlayer}

})()


const boardDisplay = (function (){

    // access the text below the game
    const playerTurnDiv = document.querySelector(".playerTurn");
    // access the game board
    const boardDiv = document.querySelector(".board");
    
    
    const updateScreen = () => {
        const activePlayer = game.getActivePlayer().name

        // show whose turn it is/check if board is in Win/Tie state
        if(gameBoard.checkWin()){
            playerTurnDiv.textContent = `${activePlayer} won!`
            console.log(`${activePlayer} won`)
        }
        else if((gameBoard.checkTie()) && !(gameBoard.checkWin())){
            playerTurnDiv.textContent = "It's a tie!"
            console.log("It's a tie.")

        }
        else{
            playerTurnDiv.textContent = `${activePlayer}'s Turn!`
        }
    }

    // board is equal to current version of 3x3 array
    const board  = gameBoard.getBoard();
    
    /*
    Loop through each row in the game board. For each cell in the current row (from left to right), 
    create a <div> element to represent the cell. Assign it custom data attributes for its row and column index (rowIndex, colIndex)
    so we can track its position. Set the div's text content to match the value stored in that cell (e.g., "X", "O", or empty), 
    then append the div to the board container in the DOM.
    */
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellDiv = document.createElement("div");
          cellDiv.classList.add("cell");
          //use custom attributes to give cells their proper place within the array (i.e. first cell has rowIndex = 0 and colIndex = 0)
          //what this is doing is telling the program to create a custom "data" attribute with names "row" and "column"
          //when you use dev-tools to look at this you'll see each cell has attributes "data-row" and "data-column"
          //SO just think of data as like a prefix? data-<attribute-name> type ish
          cellDiv.dataset.row = rowIndex;
          cellDiv.dataset.column = colIndex;

          cellDiv.textContent = cell; 
          boardDiv.appendChild(cellDiv);
        });
      });

    
      function clickHandlerBoard(e) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.column);
      
        game.playRound(row, col);

        refreshBoard();
      }

      //when the boardDiv is clicked, you observe the element that was clicked INSIDE the board which is a cell
      //then in the function clickHandlerBoard, the custome attributes data-row and data-column are used to call the function playRound
      // afterward the board is refereshed. 
      boardDiv.addEventListener("click", clickHandlerBoard)

      const refreshBoard = () => {
        const currentBoard = gameBoard.getBoard();
        const cellDivs = document.querySelectorAll(".cell");
      
        cellDivs.forEach(cell => {
          const row = parseInt(cell.dataset.row);
          const col = parseInt(cell.dataset.column);
          cell.textContent = currentBoard[row][col];
        });
      
        updateScreen();
      };
      

    updateScreen()

})()

