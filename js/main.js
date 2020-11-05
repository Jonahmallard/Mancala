/*----- constants -----*/
/*----- app's state (variables) -----*/
var holes, currentPlayer, winner;

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