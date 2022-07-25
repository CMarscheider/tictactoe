let fields = [];
let currentShape = 'cross';
let AUDIO_FAIL = new Audio('./sounds/fail.mp3');
let AUDIO_WIN = new Audio('./sounds/win.mp3');
let AUDIO_DRAW = new Audio('./sounds/draw.mp3');
let filledFields = 0;
let gameOver = false;
let winner;



function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            switchToCircle();
        } else {
            switchToCross();
        }
        fields[id] = currentShape;
        draw();
        checkForWin();
    } else {
        AUDIO_FAIL.play();
        AUDIO_FAIL.volume = 0.1;
    }
}

function switchToCircle() {
    currentShape = 'circle';
    document.getElementById('player-2').classList.remove('player-inactive');
    document.getElementById('player-1').classList.add('player-inactive');
    filledFields++;
}

function switchToCross() {
    currentShape = 'cross';
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
    filledFields++;
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}

function restart() {
    resetStats();
    resetFields();
    resetCircleAndCross();
}

function resetCircleAndCross() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}

function resetFields() {
    filledFields = 0;
    fields = [];
    for (let i = 0; i < 9; i++) {
        document.getElementById('field-' + i).style.background = "none";
    }
}

function resetStats() {
    gameOver = false;
    winner = undefined;
    document.getElementById('win').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    document.getElementById('game-over').classList.add('d-none');
}

function checkForWin() {

    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        markFieldsGreen(0, 1, 2);
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        markFieldsGreen(3, 4, 5);
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        markFieldsGreen(6, 7, 8);
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        markFieldsGreen(0, 3, 6);
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        markFieldsGreen(1, 4, 7);
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        markFieldsGreen(2, 5, 8);
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[4];
        markFieldsGreen(0, 4, 8);
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        markFieldsGreen(2, 4, 6);
    }
    checkFields();
    checkWinner();
}

function markFieldsGreen(fieldOne, fieldTwo, fieldThree) {
    document.getElementById(`field-${fieldOne}`).style.background = "green";
    document.getElementById(`field-${fieldTwo}`).style.background = "green";
    document.getElementById(`field-${fieldThree}`).style.background = "green";

}

function checkWinner() {
    if (winner) {
        gameOver = true;
        setTimeout(function () {
            document.getElementById('win').classList.remove('d-none');
            document.getElementById('restart-btn').classList.remove('d-none');
        }, 500);
        AUDIO_WIN.play();
        AUDIO_WIN.volume = 0.1;

    }
}

function checkFields() {
    if (filledFields == 9 && !winner) {
        setTimeout(function () {
            document.getElementById('game-over').classList.remove('d-none');
            document.getElementById('restart-btn').classList.remove('d-none');
        }, 500);
        gameOver = true;
        AUDIO_DRAW.play();
        AUDIO_DRAW.volume = 0.1;

    }
}