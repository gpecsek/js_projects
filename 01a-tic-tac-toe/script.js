const cell = document.querySelectorAll('.cell');
const clearBtn = document.getElementById('clearBtn');
const message = document.getElementById('message');
const tableArray = document.getElementById('table-array');
var activePlayer = 1;
var tableItems = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

cell.forEach(cell => cell.addEventListener('click', function(e) {
    exactCell = document.getElementById(e.target.id);
    if(activePlayer == 1) {
        if(checkCell(e.target.id)) {
            exactCell.innerHTML = 'X';
            message.innerHTML = 'Player 1 added "X" to cell -> ' + e.target.id;
            addItemToTable(e.target.id);
            tableArray.innerHTML = tableItems;
            checkWin();
            activePlayer = 2;
            changePlayer();
        } else {
            message.innerHTML = e.target.id + ' cell is already in use. CHOOSE ANOTHER EMPTY CELL!';
        }
        
    } else {
        if(checkCell(e.target.id)) {
            exactCell.innerHTML = 'O';
            message.innerHTML = 'Player 2 added "O" to cell -> ' + e.target.id;
            addItemToTable(e.target.id);
            tableArray.innerHTML = tableItems;
            checkWin();
            activePlayer = 1;
            changePlayer();
        } else {
            message.innerHTML = e.target.id + ' cell is already in use. CHOOSE ANOTHER EMPTY CELL!';
        }
        
    }
    
}));

clearBtn.addEventListener('click', function() {
    clearTable();
});


function clearTable() {
    cell.forEach(cell => cell.innerHTML = "");
    document.getElementById("player-1").classList.remove("active-player");
    document.getElementById("player-2").classList.remove("active-player");
    document.getElementById("player-1").classList.add("active-player");
    tableItems = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    tableArray.innerHTML = tableItems;
    message.innerHTML = 'Table cleared -> NEW GAME';
};

function changePlayer() {
    if(activePlayer != 1) {
        document.getElementById("player-1").classList.remove("active-player");
        document.getElementById("player-2").classList.add("active-player");
    } else {
        document.getElementById("player-2").classList.remove("active-player");
        document.getElementById("player-1").classList.add("active-player");
    }
};

function addItemToTable(id) {
    var itemLocation = id.slice(-2);
    var rowNumber = parseInt(itemLocation[0]-1);
    var columnNumber = parseInt(itemLocation[1]-1);
    if(activePlayer != 1) {
        tableItems[rowNumber][columnNumber] = 2;
    } else {
        tableItems[rowNumber][columnNumber] = 1;
    }
};

function checkCell(cellId) {
    var cellNumber = cellId.slice(-2);
    var rowNumber = parseInt(cellNumber[0]-1);
    var columnNumber = parseInt(cellNumber[1]-1);
    if(tableItems[rowNumber][columnNumber] != 0) {
        return false;
    } else {
        return true;
    }
}

function checkWin() {
    if (tableItems[0][0] == 1 && tableItems[0][1] == 1 && tableItems[0][2] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[1][0] == 1 && tableItems[1][1] == 1 && tableItems[1][2] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[2][0] == 1 && tableItems[2][1] == 1 && tableItems[2][2] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[0][0] == 1 && tableItems[1][0] == 1 && tableItems[2][0] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[0][1] == 1 && tableItems[1][1] == 1 && tableItems[2][1] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[0][2] == 1 && tableItems[1][2] == 1 && tableItems[2][2] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[0][0] == 1 && tableItems[1][1] == 1 && tableItems[2][2] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }
    if (tableItems[0][2] == 1 && tableItems[1][1] == 1 && tableItems[2][0] == 1) { message.innerHTML = 'Player 1 WIN!!!!!!!!!!'; }

    if (tableItems[0][0] == 2 && tableItems[0][1] == 2 && tableItems[0][2] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[1][0] == 2 && tableItems[1][1] == 2 && tableItems[1][2] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[2][0] == 2 && tableItems[2][1] == 2 && tableItems[2][2] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[0][0] == 2 && tableItems[1][0] == 2 && tableItems[2][0] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[0][1] == 2 && tableItems[1][1] == 2 && tableItems[2][1] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[0][2] == 2 && tableItems[1][2] == 2 && tableItems[2][2] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[0][0] == 2 && tableItems[1][1] == 2 && tableItems[2][2] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
    if (tableItems[0][2] == 2 && tableItems[1][1] == 2 && tableItems[2][0] == 2) { message.innerHTML = 'Player 2 WIN!!!!!!!!!!'; }
}