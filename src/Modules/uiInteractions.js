export function initializeUI(players){
    const gameBoard = document.querySelector(".game-board");
    const board1 = renderBoard(players.player1)
    const board2 = renderBoard(players.player2)
    
    gameBoard.appendChild(board1)
    gameBoard.appendChild(board2)
}


function renderBoard(player){
    const board = document.createElement("div")
    board.classList.add("board")
    board.setAttribute("id", player.name)

    if(player.isCurrentPlayer){
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                const cell = document.createElement("div");
                switch(player.gameboard.grid[i][j]){
                    case null:
                        cell.classList.add("unplayed");
                        break
                    case 0:
                        cell.classList.add("empty");
                        cell.textContent = "X";
                        break;
                    case 1:
                        cell.classList.add("hit");
                        cell.textContent = "X";
                        break;
                    default:
                        cell.classList.add("ship");
                        break
                }
                cell.classList.add("cell");
                cell.setAttribute("id", `${i}-${j}`);
                board.appendChild(cell);
            }
        }
    }
    else {
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                const cell = document.createElement("div");
                switch(player.gameboard.grid[i][j]){
                    case 0:
                        cell.classList.add("empty");
                        cell.textContent = "X";
                        break;
                    case 1:
                        cell.classList.add("hit");
                        cell.textContent = "X";
                        break;
                    default:
                        cell.classList.add("unplayed");
                        break
                }
                cell.classList.add("cell");
                cell.setAttribute("id", `${i}-${j}`);

                cell.addEventListener("mouseenter", () => {
                    if(cell.classList[0] === "unplayed"){
                        cell.innerText = "X";
                    }
                    })
                cell.addEventListener("mouseleave", () => {
                    if(cell.classList[0] === "unplayed"){
                        cell.innerText = "";
                    }
                    })
                
                cell.addEventListener("click", () => {
                    if(cell.classList[0] === "unplayed"){
                        const cellId = cell.getAttribute("id");
                        const cellRow = Number(cellId[0]);
                        const cellCol = Number(cellId[2]);
                        cell.innerText = "X";
                        const isHit = player.gameboard.receiveAttack([cellRow, cellCol]);
                        cell.classList.remove("unplayed");
                        isHit ? cell.classList.add("hit") : cell.classList.add("empty");
                        /* if(gameManager.getGameOver()){
                            const winner = gameManager.getWinner();
                            showGameOver(winner);
                            if(winner !== null){
                                updatePlayerScore(winner);
                            }
                        } */
                    }
                }) 
                board.appendChild(cell);
            }
        }
    }
    return board;
}