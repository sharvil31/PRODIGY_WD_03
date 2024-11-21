
export const checkWinner = (data, setLock, setWinner) => {

    const winCoditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winCoditions) {
        const [a, b, c] = condition;
        if(data[a] === data[b] && data[b] === data[c] && data[c] !== "") {
            setLock(true);
            setWinner(data[a]);
            return;
        };
    };

    if(!data.includes("")) {
        setLock(true);
        setWinner("draw");
    }
};


export function computerMove(board, playerChoice) {
    // Determine the computer's choice dynamically
    const computerChoice = playerChoice === "X" ? "O" : "X";

    // Check for available moves
    function isMovesLeft(board) {
        return board.some(cell => cell === "");
    }

    // Evaluate the board for winning, losing, or drawing
    function evaluateBoard(board) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a] === computerChoice ? 10 : -10;
            }
        }
        return 0; // No winner
    }

    // Minimax algorithm to find the optimal move
    function minimax(board, depth, isMaximizing) {
        const score = evaluateBoard(board);

        if (score === 10) return score - depth; // Maximize win score
        if (score === -10) return score + depth; // Minimize loss score
        if (!isMovesLeft(board)) return 0; // Draw

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = computerChoice;
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = ""; // Undo move
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = playerChoice;
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = ""; // Undo move
                }
            }
            return best;
        }
    }

    // Find the best move for the computer
    function findBestMove(board) {
        let bestVal = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = computerChoice; // Try move
                const moveVal = minimax(board, 0, false);
                board[i] = ""; // Undo move

                if (moveVal > bestVal) {
                    bestVal = moveVal;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    const bestMove = findBestMove(board);
    if (bestMove !== -1) {
        board[bestMove] = computerChoice; // Make the optimal move
    }
}
;
  