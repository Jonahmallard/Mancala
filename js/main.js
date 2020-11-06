/*----- constants -----*/
/*----- app's state (variables) -----*/
let holes, currentPlayer, winner;

/*----- cached element references -----*/
let player1 = document.getElementById('player1')
let player2 = document.getElementById('player2')
let oneEl = document.getElementById('one');
let twoEl = document.getElementById('two');
let p1ScoreEl = document.querySelector('#p1score');
let p2ScoreEl = document.querySelector('#p2score');

/*----- event listeners -----*/
document.querySelector('.gameboard').addEventListener('click', handleClick);

document.querySelector('.reset').addEventListener('click', function(){
    init();
    render();
});

/*----- functions -----*/
function init() {
    holes = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    currentPlayer = 'one';
    gameWinner = null;
}

function winner() {
    if (holes[0] === 0 && holes[1] === 0 && holes[2] === 0 && holes[3] === 0 && holes[4] === 0 && holes[5] === 0) {
        getWinner();
    } 
    if (holes[7] === 0 && holes[8] === 0 && holes[9] === 0 && holes[10] === 0 && holes[11] === 0 && holes[12] === 0) {
        getWinner();
    }
}

function getWinner(){
    if (holes[6] > holes[13]) {
        gameWinner = 'one'
    } else {
        gameWinner = 'two'
    }
}

