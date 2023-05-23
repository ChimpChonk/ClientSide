const gameBoard = document.querySelector('.gameboard');

// gameBoard.addEventListener("click", (e) => {
//     if (e.target.tagName != "BUTTON") return;
//     alert(e.target.tagName);
// });

let playerXTurn = true;

const createEvt = (fields) => {
    fields.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.target.innerText =="")
            {
                e.target.innerText = playerXTurn ? "X" : "O";
                setTimeout(5000);
                //Winner check
                if(winnerCheck(fields)) {
                    alert("Winner is " + (playerXTurn ? "X" : "O") + " !")
                    reset();
                }
                playerXTurn = !playerXTurn;
            }
        });
    });
};

const winnerCheck = (fields) => {

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

    // const fields = document.querySelectorAll('.field');
    // const winArr = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [2,4,6],
    //     [0,4,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8]
    // ];
    // let win = false;
    // winArr.forEach((arr) => {
    //     if(fields[arr[0]].innerText == fields[arr[1]].innerText && fields[arr[1]].innerText == fields[arr[2]].innerText && fields[arr[0]].innerText != "") win = true;
    // });
    // return win;
}

const init = () => {
    // for(let i = 0; i < 9 ; i++) {
        // let btn = document.createElement("button");
        // btn.className = "field";
        // gameBoard.appendChild(btn);
    // }

    for(let row = 0; row < 3 ; row++) {
        for(let col = 0; col < 3 ; col++) {
            let btn = document.createElement("button");
            btn.className = "field";
            btn.id = `r${row}c${col}`;
            gameBoard.appendChild(btn);
        }
    }
    const fields = document.querySelectorAll('.field');
    createEvt(fields);
};

const reset = () => {
    const fields = document.querySelectorAll('.field');
    fields.forEach((btn) => {
        btn.innerText = "";
    });
    playerXTurn = true;
};

init();