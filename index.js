let boxes = document.querySelectorAll(".box");
let box = document.getElementById("box")


let turn = "X"
let isGameOver = false;

let scores = { "X": 0, "O": 0, "Draw": 0 };


boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            chekWin()
            chekDraw()
            changeTurn();
        }
    })
})

function changeTurn() {
    if (turn === "X") {
        turn = "O"
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X"
        document.querySelector(".bg").style.left = "0";
        
    }
}

function chekWin() {
    let winCondition = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
        [0, 5, 10, 15], [3, 6, 9, 12]
    ]
    for (let i = 0; i < winCondition.length; i++) {
        let v0 = boxes[winCondition[i][0]].innerHTML;
        let v1 = boxes[winCondition[i][1]].innerHTML;
        let v2 = boxes[winCondition[i][2]].innerHTML;
        let v3 = boxes[winCondition[i][3]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2 && v0 === v3) {
            isGameOver = true
            document.querySelector("#hasil").innerHTML = turn + " win";
            document.querySelector("#playAgain").style.display = "inline";
            document.querySelector("#reset").style.display = "block";

            for (j = 0; j < 4; j++) {
                boxes[winCondition[i][j]].style.backgroundColor = "#043b20"
            }

            if (turn === "X") {
                newScore("X");
            } else {
                newScore("O");
            }
            newScore(turn);
        }
        document.getElementById("ex").innerHTML = `X: ${scores["X"]}`;
        document.getElementById("ow").innerHTML = `O: ${scores["O"]}`;
    }
    }

function chekDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        })

        if (isDraw) {
            isGameOver = true
            document.querySelector("#hasil").innerHTML = "Draw";
            document.querySelector("#playAgain").style.display = "inline";
            document.querySelector("#reset").style.display = "block";

        }
    }
}

document.querySelector("#playAgain").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#hasil").innerHTML = "";
    document.querySelector("#playAgain").style.display = "none";
    document.querySelector("#reset").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})

function newScore(result) {
    scores[result]++;
    localStorage.setItem('userScores', JSON.stringify(scores));
}

function getScores() {
    let savedScores = localStorage.getItem('userScores');
    return savedScores ? JSON.parse(savedScores) : { "X": 0, "O": 0, "Draw": 0 };
}

scores = getScores();
document.getElementById("ex").innerHTML = `X: ${scores["X"]}`;
document.getElementById("ow").innerHTML = `O: ${scores["O"]}`;

function riset() {
    localStorage.clear();
    window.location.reload();
}
