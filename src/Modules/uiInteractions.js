export function initializeUI(players){
    const gameBoard = document.querySelector(".game-board");
    const board1 = createBoard(players.player1)
    const board2 = createBoard(players.player2)
    
    gameBoard.appendChild(board1)
    gameBoard.appendChild(board2)
}


function createBoard(player){
    const board = document.createElement("div")
    board.classList.add("board")
    board.setAttribute("id", player.name)

    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            const cell = document.createElement("div");
            switch(player.gameboard.grid[i][j]){
                case null:
                    cell.classList.add("unplayed");
                    break
                case 0:
                    cell.classList.add("empty");
                    break;
                case 1:
                    cell.classList.add("hit");
                    break;
                default:
                    cell.classList.add("ship");
                    break
            }
            cell.classList.add("cell");
            cell.setAttribute("id", `${i}-${j}`);
    /* 
            cell.addEventListener("mouseenter", () => {
                if(cell.classList[1] === "unplayed" && !gameManager.getGameOver()){
                    cell.innerText = gameManager.getCurrentPlayer().getToken() === 1 ? "X" : "O";
                }
                })
            cell.addEventListener("mouseleave", () => {
                if(cell.classList[1] === "unplayed" && !gameManager.getGameOver()){
                    cell.innerText = "";
                }
                })
            cell.addEventListener("click", () => {
                if(cell.classList[1] === "unplayed" && !gameManager.getGameOver()){
                    const cellId = cell.getAttribute("id");
                    const cellRow = Number(cellId[0]);
                    const cellCol = Number(cellId[2]);
                    cell.innerText = gameManager.getCurrentPlayer().getToken() === 1 ? "X" : "O";
                    gameManager.playTurn(cellRow, cellCol);
                    cell.classList.remove("unplayed");
                    cell.classList.add("played");
                    if(gameManager.getGameOver()){
                        const winner = gameManager.getWinner();
                        showGameOver(winner);
                        if(winner !== null){
                            updatePlayerScore(winner);
                        }
                    }
                }
            }) */
            board.appendChild(cell);
        }
    }
    return board;
}