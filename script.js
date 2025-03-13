const boardElement = document.getElementById('board');
const turnElement = document.getElementById('turn');
const resultElement = document.getElementById('result');

const BLACK = 'black';
const WHITE = 'white';
const EMPTY = null;

let board = [];
let currentPlayer = BLACK;
let isHumanTurn = true;
let isVsComputer = false;

document.getElementById('start-black').addEventListener('click', () => startGame(BLACK, true));
document.getElementById('start-white').addEventListener('click', () => startGame(WHITE, true));
document.getElementById('start-human').addEventListener('click', () => startGame(BLACK, false));

function startGame(humanColor, vsComputer) {
    currentPlayer = humanColor;
    isHumanTurn = (humanColor === BLACK);
    isVsComputer = vsComputer;
    initializeBoard();
}

function initializeBoard() {
    board = Array(8).fill().map(() => Array(8).fill(EMPTY));
    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;
    renderBoard();
    showPossibleMoves();
    turnElement.textContent = `${currentPlayer === BLACK ? '黒' : '白'}のターン`;
    // 自動実行は、対PCモードかつ、黒ターン（人間が黒以外の場合）に限定する
    if (isVsComputer && currentPlayer === BLACK && !isHumanTurn) {
        setTimeout(computerMove, 500);
    }
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell) {
                cellElement.classList.add(cell);
            }
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;
            boardElement.appendChild(cellElement);
        });
    });
}

function showPossibleMoves() {
    const possibleMoves = getPossibleMoves(currentPlayer);
    possibleMoves.forEach(([row, col]) => {
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('possible');
        cellElement.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(event) {
    if (!isHumanTurn) return;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    if (makeMove(currentPlayer, row, col)) {
        renderBoard();
        currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
        turnElement.textContent = `${currentPlayer === BLACK ? '黒' : '白'}のターン`;
        if (!hasPossibleMoves(currentPlayer)) {
            currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
            if (!hasPossibleMoves(currentPlayer)) {
                endGame();
            } else {
                turnElement.textContent = `${currentPlayer === BLACK ? '黒' : '白'}のターン（パス）`;
            }
        }
        isHumanTurn = !isHumanTurn;
        if (isVsComputer && !isHumanTurn) {
            setTimeout(computerMove, 500);
        } else {
            showPossibleMoves();
        }
    }
}

async function computerMove() {
    if (!isVsComputer || isHumanTurn) return;

    const thinking = document.getElementById('thinking');
    thinking.classList.remove('hidden');  // 思考中表示を確実に表示

    try {
        // 意図的な遅延を入れる
        await new Promise(resolve => setTimeout(resolve, 1000));

        const possibleMoves = getPossibleMoves(currentPlayer);
        if (possibleMoves.length === 0) {
            thinking.classList.add('hidden');
            return;
        }

        // コンピュータの手を決定
        const [row, col] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        makeMove(currentPlayer, row, col);
        renderBoard();

        // ターン変更処理
        currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
        turnElement.textContent = `${currentPlayer === BLACK ? '黒' : '白'}のターン${isHumanTurn ? '（あなた）' : ''}`;

        if (!hasPossibleMoves(currentPlayer)) {
            currentPlayer = currentPlayer === BLACK ? WHITE : BLACK;
            if (!hasPossibleMoves(currentPlayer)) {
                endGame();
            } else {
                turnElement.textContent = `${currentPlayer === BLACK ? '黒' : '白'}のターン（パス）`;
            }
        }

        isHumanTurn = !isHumanTurn;
        if (isHumanTurn) {
            showPossibleMoves();
        }
    } finally {
        thinking.classList.add('hidden');  // 確実に非表示にする
    }

    // 次のコンピュータの手番
    if (!isHumanTurn) {
        setTimeout(computerMove, 500);
    }
}

function makeMove(player, row, col) {
    if (!isValidMove(player, row, col)) return false;
    board[row][col] = player;
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    directions.forEach(([dr, dc]) => {
        const toFlip = [];
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] && board[r][c] !== player) {
            toFlip.push([r, c]);
            r += dr;
            c += dc;
        }
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
            toFlip.forEach(([fr, fc]) => board[fr][fc] = player);
        }
    });
    isHumanTurn = !isHumanTurn;
    return true;
}

function isValidMove(player, row, col) {
    if (board[row][col] !== EMPTY) return false;
    const opponent = player === BLACK ? WHITE : BLACK;
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        let hasOpponentBetween = false;
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === opponent) {
            hasOpponentBetween = true;
            r += dr;
            c += dc;
        }
        if (hasOpponentBetween && r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === player) {
            return true;
        }
    }
    return false;
}

function getPossibleMoves(player) {
    const possibleMoves = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (isValidMove(player, row, col)) {
                possibleMoves.push([row, col]);
            }
        }
    }
    return possibleMoves;
}

function hasPossibleMoves(player) {
    return getPossibleMoves(player).length > 0;
}

function endGame() {
    const blackCount = board.flat().filter(cell => cell === BLACK).length;
    const whiteCount = board.flat().filter(cell => cell === WHITE).length;
    let result;
    if (blackCount > whiteCount) {
        result = '黒の勝利！';
    } else if (whiteCount > blackCount) {
        result = '白の勝利！';
    } else {
        result = '引き分け！';
    }
    resultElement.textContent = `ゲーム終了: ${result} (黒: ${blackCount}, 白: ${whiteCount})`;
}