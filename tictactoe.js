console.log("bwuh");

// Store the gameboard as an array inside of a gameBoard object

function createGame(){
    const game = [
        ["X","O","O"],
        ["O","X","O"],
        ["O","X","X"]
    ]
    return {
        board: game
    }
}

const game = createGame()

// Players are also going to be stored in objects

function createPlayer(name, player){
    if(player === 1){
        mark = 'X'
    }
    else if (player === 2){
        mark = 'O'
    }
    else{
        console.log("Sorry, " + name + ". Player number can only be 1 or 2.")
    }
    return{
        name,
        mark,
        saySymbol(){
            console.log("Your symbol is: " + mark);
        }
    }
}

const player1 = createPlayer('jacob', 1)
const player2 = createPlayer('alex', 2)
// const player3 = createPlayer('bob', 3)
// Create an object to control the flow of the game itself

function gameFlow(game, player1, player2){

    if(
        (game.board[0][0] === 'X' && game.board[0][1] === 'X' && game.board[0][2] === 'X') ||
        (game.board[1][0] === 'X' && game.board[1][1] === 'X' && game.board[1][2] === 'X') ||
        (game.board[2][0] === 'X' && game.board[2][1] === 'X' && game.board[2][2] === 'X') ||
        (game.board[0][0] === 'X' && game.board[1][0] === 'X' && game.board[2][0] === 'X') ||
        (game.board[0][1] === 'X' && game.board[1][1] === 'X' && game.board[2][1] === 'X') ||
        (game.board[0][2] === 'X' && game.board[1][2] === 'X' && game.board[2][2] === 'X') ||
        (game.board[0][0] === 'X' && game.board[1][1] === 'X' && game.board[2][2] === 'X')
    ){
        console.log(player1.name + ' Wins!')
    }
    else if(
        (game.board[0][0] === 'O' && game.board[0][1] === 'O' && game.board[0][2] === 'O') ||
        (game.board[1][0] === 'O' && game.board[1][1] === 'O' && game.board[1][2] === 'O') ||
        (game.board[2][0] === 'O' && game.board[2][1] === 'O' && game.board[2][2] === 'O') ||
        (game.board[0][0] === 'O' && game.board[1][0] === 'O' && game.board[2][0] === 'O') ||
        (game.board[0][1] === 'O' && game.board[1][1] === 'O' && game.board[2][1] === 'O') ||
        (game.board[0][2] === 'O' && game.board[1][2] === 'O' && game.board[2][2] === 'O') ||
        (game.board[0][0] === 'O' && game.board[1][1] === 'O' && game.board[2][2] === 'O')
    ){
        console.log(player2.name + " Wins!")
    }
    else if(game.board.some(row => row.includes(""))){
        console.log('play on')
    }
    else{
        console.log('tie game')
    }
}