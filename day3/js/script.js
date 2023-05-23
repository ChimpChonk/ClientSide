
const clock = document.getElementById('clock');

function showTime() {
    clock.innerHTML = new Date().toLocaleTimeString();
};
setInterval(showTime, 1000);

const gameboard = document.querySelector('.gameboard');

let playerXTurn = true;
let playerXScore = 0;
let playerOScore = 0;

const setMark = function() {
    if(this.innerText !== "") {return;}
    this.innerText = playerXTurn ? 'X' : 'O';
    if(winner()) {
        let w;
        if(playerXTurn) {
            playerXScore++;
            document.querySelector("#playerXScore").innerText = playerXScore;
            w = `Winner is Player 1`;
        }
        else {
            playerOScore++;
            document.querySelector("#playerOScore").innerText = playerOScore;
            w = `Winner is Player 2`;
        }
     alert(w);
    }
    playerXTurn = !playerXTurn;
}

const winner = function() {
    const fields = document.querySelectorAll('.gameboard button');

    for(let row = 0; row < 3 ; row++) {
        if (document.querySelector(`#r${row}c0`).innerText === 
            document.querySelector(`#r${row}c1`).innerText &&
            document.querySelector(`#r${row}c0`).innerText === 
            document.querySelector(`#r${row}c2`).innerText &&
            document.querySelector(`#r${row}c0`).innerText != "") return true;
    }

    for(let col = 0; col < 3 ; col++) {
        if (document.querySelector(`#r0c${col}`).innerText ===
            document.querySelector(`#r1c${col}`).innerText &&
            document.querySelector(`#r0c${col}`).innerText ===
            document.querySelector(`#r2c${col}`).innerText &&
            document.querySelector(`#r0c${col}`).innerText != "") return true;
    }

    if (document.querySelector("#r0c0").innerText ===
        document.querySelector("#r1c1").innerText &&
        document.querySelector("#r0c0").innerText ===
        document.querySelector("#r2c2").innerText &&
        document.querySelector("#r0c0").innerText != "") return true;

    if (document.querySelector("#r0c2").innerText ===
        document.querySelector("#r1c1").innerText &&
        document.querySelector("#r0c2").innerText ===
        document.querySelector("#r2c0").innerText &&
        document.querySelector("#r0c2").innerText != "") return true;

}

for (let row = 0; row < 3; row++){
    for(let col = 0; col < 3; col++){
        let btn = document.createElement('button');
        btn.id = `r${row}c${col}`;
        btn.addEventListener('click' , setMark);
        gameboard.appendChild(btn);
    }
}

function newGame() {
    const fields = document.querySelectorAll('.gameboard button');
    fields.forEach(field => field.innerText = "");
    playerXTurn = true;
}

function resetScore() {
    document.querySelector("#playerXScore").innerText = 0;
    document.querySelector("#playerOScore").innerText = 0;
    newGame();
}

document.querySelector("#btnNewGame").addEventListener('click', newGame);
document.querySelector("#btnReset").addEventListener('click', resetScore);
