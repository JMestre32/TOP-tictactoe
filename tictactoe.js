console.log("bwuh");

// Store the gameboard as an array inside of a gameBoard object

function createGame(){
    const game = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    return {
        board: game
    }
}

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

// const player1 = createPlayer('jacob', 1)
// const player2 = createPlayer('alex', 2)
// const player3 = createPlayer('bob', 3)
// Create an object to control the flow of the game itself