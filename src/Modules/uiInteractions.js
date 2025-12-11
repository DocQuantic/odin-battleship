import Ship from "./ship";

let gamePlayers = undefined
let winner = undefined

export function initializeUI(players){
    gamePlayers = players
    setupPlacementListeners()
    renderBoards()
}

function setupPlacementListeners(){
    const placeBtn = document.querySelector("#place-btn")
    const shipSelector = document.querySelector("#ships");
    const coordElement = document.querySelector("#coord")
    const orientElement = document.querySelector("#orient")

    placeBtn.addEventListener("click", () => {
        const shipType = shipSelector.options[shipSelector.selectedIndex].value
        const coord = coordElement.value
        const orientation = orientElement.options[orientElement.selectedIndex].value

        const shipValue = interpretShipType(shipType)
        const coordValue = interpretCoord(coord)
        const orientationValue = interpretShipOrient(orientation)

        gamePlayers.player1.gameboard.placeShip(new Ship(shipValue), coordValue, orientationValue);

        console.log(gamePlayers.player1.gameboard)

        renderBoards()

        console.log(shipSelector.remove(shipSelector.selectedIndex))
    })
}

function interpretShipType(type){
    switch(type){
        case "carrier":
            return 5
        case "battleship":
            return 4
        case "cruiser":
            return 3
        case "submarine":
            return 3
        case "destroyer":
            return 2
    }
}

function interpretCoord(coord){
    const coords = coord.split("")
    
    return [parseInt(coords[0]), parseInt(coords[1])]
}

function interpretShipOrient(orient){
    switch(orient){
        case "horizontal":
            return "x"
        case "vertical":
            return "y"
    }
}

function renderBoards(){
    const gameBoard = document.querySelector(".game-board");

    if(gameBoard.childNodes.length !== 1){
        gameBoard.removeChild(gameBoard.childNodes[2])
        gameBoard.removeChild(gameBoard.childNodes[1])
    }

    const board1 = renderBoard(gamePlayers.player1)
    const board2 = renderBoard(gamePlayers.player2)
    
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
                    if(cell.classList[0] === "unplayed" & winner === undefined){
                        cell.innerText = "X";
                    }
                    })
                cell.addEventListener("mouseleave", () => {
                    if(cell.classList[0] === "unplayed" & winner === undefined){
                        cell.innerText = "";
                    }
                    })
                
                cell.addEventListener("click", () => {
                    if(cell.classList[0] === "unplayed" & winner === undefined){
                        const cellId = cell.getAttribute("id");
                        const cellRow = Number(cellId[0]);
                        const cellCol = Number(cellId[2]);
                        cell.innerText = "X";
                        const isHit = player.gameboard.receiveAttack([cellRow, cellCol]);
                        cell.classList.remove("unplayed");
                        isHit ? cell.classList.add("hit") : cell.classList.add("empty");
                        changeTurn()
                    }
                }) 
                board.appendChild(cell);
            }
        }
    }
    return board;
}

function changeTurn(){
    if(gamePlayers.player1.gameboard.isGameOver){
        winner = gamePlayers.player1
        showGameOver(2);
    }
    else if(gamePlayers.player2.gameboard.isGameOver){
        winner = gamePlayers.player1
        showGameOver(1);
    }
    else {
        if(gamePlayers.player1.isCurrentPlayer){
            gamePlayers.player1.isCurrentPlayer = false
            gamePlayers.player2.isCurrentPlayer = true
        }
        else {
            gamePlayers.player1.isCurrentPlayer = true
            gamePlayers.player2.isCurrentPlayer = false
        }

        if(gamePlayers.player2.isCurrentPlayer & gamePlayers.player2.type === "computer"){
            let col = Math.floor(Math.random() * 10)
            let row = Math.floor(Math.random() * 10)

            if(gamePlayers.player1.gameboard.grid[row][col] !== 1){
                gamePlayers.player1.gameboard.receiveAttack([row, col])
            }
            else {
                while(gamePlayers.player1.gameboard.grid[row][col] === 1){
                    col = Math.floor(Math.random() * 10)
                    row = Math.floor(Math.random() * 10)

                    gamePlayers.player1.gameboard.receiveAttack([row, col])
                }
            }

            changeTurn()
            return
        }
        else {
            
            renderBoards()
        }
    }
}

function showGameOver(player){
    const gameOverElement = document.querySelector("#game-over");

    gameOverElement.innerText = `Congratulations! Player ${player} won the game.`

    gameOverElement.classList.remove("game-not-over");
    gameOverElement.classList.add("game-over");
}