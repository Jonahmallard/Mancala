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

/*----- functions -----*/
function init() {
    holes = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    currentPlayer = 'one';
    gameWinner = null;
}

function handleClick(e){
    let idx = parseInt(e.target.id.replace('holes', ''));
    if (currentPlayer === 'one' && idx > 5) return;
    if (currentPlayer === 'two' && (idx <= 6 || idx === 13)) return;
    let lastHole = distStones(idx);
    
    snatchStones(lastHole);
    switchTurns(lastHole);
    gameWinner = winner();

    winner();
    render();
}

function distStones(holeIdx) {
    let numStones = holes[holeIdx];
    holes[holeIdx] = 0;
    holeIdx += 1;
    while (numStones > 0) {
        if (holeIdx > 13) holeIdx = 0;
        if ((currentPlayer === 'one' && holeIdx !== 13) || (currentPlayer === 'two' && holeIdx !== 6))  {
            holes[holeIdx]++;
            numStones--;
        }
        holeIdx++;
    }
    return --holeIdx;
}

function onOwnSide(holeIdx){
    if (currentPlayer === 'one' && holeIdx < 6) return true;
    if (currentPlayer === 'two' && holeIdx > 6 && holeIdx < 13) return true;
    return false;
}

  function snatchStones(lastIdx){
    if (
        lastIdx === 6 || lastIdx === 13 ||
        holes[lastIdx] > 1 || !onOwnSide(lastIdx) ||
        holes[12 - lastIdx] === 0
    )
    return;
    let manIdx = currentPlayer === 'one' ? 6 : 13;
    holes[manIdx] += (1 + holes[12 - lastIdx]);
    holes[lastIdx] = holes[12 - lastIdx] = 0;
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
}

init();
render();


