window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const startButton = document.querySelector('#start');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const playerTurn = document.querySelector('.display');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = false;

    const startGame = () => {
        playerTurn.classList.remove('hide');
        isGameActive = true;
    }

    const PLAYERXWON = 'PLAYERX_WON';
    const PLAYEROWON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winStates = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['0', '4', '8'],
        ['2', '4', '6']
    ];

    function handleResult() {
        let roundWon = false;

        for (let i = 0; i <= 7; i++) {
            let winState = winStates[i];
            const a = board[winState[0]];
            const b = board[winState[1]];
            const c = board[winState[2]];

            if (a == '' || b == '' || c == '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERXWON : PLAYEROWON);
            
            playerTurn.classList.add('hide');
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
            playerTurn.classList.add('hide');
            isGameActive = false;
        }
    }

    const isValidAction = (tile) => {
        if (tile.innerText == 'X' || tile.innerText == 'O') {
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const announce = (type) => {
        switch (type) {
            case PLAYEROWON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERXWON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
                break;
        }
        announcer.classList.remove('hide');
    }



    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player$(currentPlayer)`);
            updateBoard(index);
            handleResult();
            changePlayer();
        }
    }

    const changePlayer = () => {
        playerDisplay.classList.remove('player$(currentPlayer)');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player$(currentPlayer)`);
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = false;
        announcer.classList.add('hide');

        if (currentPlayer == 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        })
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    startButton.addEventListener('click', () => {
        startButton.classList.add('hide');
        startGame();
    })
    resetButton.addEventListener('click', () => {
        startButton.classList.remove('hide');
        resetBoard();
    });
})