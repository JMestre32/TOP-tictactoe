console.log("bwuh");

// 2D Array? 
let arr = [['x', 'x', 'o'], ['o', 'x', 'x'], ['o', 'x', 'o']
];

let winningArr = [['X', 'X', 'X'], ['o', 'o', 'x'], ['o', 'x', 'o']]
let diagonalArr = [['X', 'O', 'X'], ['O', 'X', 'O'], ['O', 'X', 'X']]
let oArr = [['O', 'X', 'O'], ['X', 'O', 'O'], ['X', 'X', 'O']];
let tieArr = [['X', 'X', 'O'], ['X', 'O', 'O'], ['O', 'X', 'O']];

function checkGame(game){
    if(game[0][0] === 'X' && game[0][1] === 'X' && game[0][2] === 'X'
        || game[1][0] === 'X' && game[1][1] === 'X' && game[1][2] === 'X' 
        || game[2][0] === 'X' && game[2][1] === 'X' && game[2][2] === 'X'
        || game[0][0] === 'X' && game[1][1] === 'X' && game[2][2] === 'X'
    ){
        console.log("GAME OVER 'X' wins!" );
    }
    else if(game[0][0] === 'O' && game[0][1] === 'O' && game[0][2] === 'O'
        || game[1][0] === 'O' && game[1][1] === 'O' && game[1][2] === 'O' 
        || game[2][0] === 'O' && game[2][1] === 'O' && game[2][2] === 'O'
        || game[0][0] === 'O' && game[1][1] === 'O' && game[2][2] === 'O'){
            console.log("GAME OVER 'O' wins!");
        }
    else{
        console.log("Tie game.")
    }
}