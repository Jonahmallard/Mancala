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

function switchTurns(lastIdx){
    if ((currentPlayer === 'one' && lastIdx !== 6) || (currentPlayer === 'two' && lastIdx !== 13)) {
        currentPlayer = currentPlayer === 'one' ? 'two' : 'one';
    }
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

function render() {
    holes.forEach(function(numStones, idx){
        let holeEl = document.getElementById('holes' + idx);
        holeEl.innerHTML = numStones;
    });

    p1ScoreEl.innerText = holes[6]; 
    p2ScoreEl.innerText = holes[13]; 

    if (gameWinner) {
        document.querySelectorAll('h3').forEach(function(winner){
            winner.innerHTML = ' Player ' + (gameWinner === 'one' ? 'One' : 'Two') + ' Won ! ';  
        });
        oneEl.style.border = twoEl.style.border = '';
    } else {
        player1.innerText = 'Player One ';
        player2.innerText = 'Player Two ';
        oneEl.style.border = currentPlayer === 'one' ? '2px solid white' : '';
        twoEl.style.border = currentPlayer === 'two' ? '2px solid white' : '';
    }
};

init();
render();


