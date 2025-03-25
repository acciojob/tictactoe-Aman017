//your JS code here. If required.
   const board = document.getElementById("board");
        const message = document.getElementById("message");
        const submitBtn = document.getElementById("submit");
        let player1, player2;
        let currentPlayer;
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        let gameActive = true;

        submitBtn.addEventListener("click", () => {
            player1 = document.getElementById("player-1").value || "Player 1";
            player2 = document.getElementById("player-2").value || "Player 2";
            currentPlayer = player1;
            message.innerText = `${currentPlayer}, you're up!`;
            document.getElementById("player-input").style.display = "none";
            board.style.display = "grid";
            renderBoard();
        });

        function renderBoard() {
            board.innerHTML = "";
            gameBoard.forEach((cell, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.id = index;
                cellDiv.setAttribute("data-cy", `cell-${index}`);
                cellDiv.innerText = cell;
                cellDiv.addEventListener("click", handleMove);
                board.appendChild(cellDiv);
            });
        }

        function handleMove(event) {
            const index = event.target.id;
            if (gameBoard[index] !== "" || !gameActive) return;
            gameBoard[index] = currentPlayer === player1 ? "X" : "O";
            renderBoard();
            checkWinner();
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            if (gameActive) message.innerText = `${currentPlayer}, you're up!`;
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameActive = false;
                    message.innerText = `${currentPlayer} congratulations, you won!`;
                    return;
                }
            }

            if (!gameBoard.includes("")) {
                gameActive = false;
                message.innerText = "It's a draw!";
            }
        }