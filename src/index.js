import "./styles.css";
import Player from "./Modules/player";
import Gameboard from './Modules/gameboard'
import Ship from "./Modules/ship";
import { initializeUI } from "./Modules/uiInteractions";

const players = {
    player1: new Player("real", "1", new Gameboard()),
    player2: new Player("computer", "2", new Gameboard())
}

players.player1.isCurrentPlayer = true

populateComputerBoard()
initializeUI(players)

function populateComputerBoard(){    
    const board = players.player2.gameboard;

    board.placeShip(new Ship(1), [0,1], "x")
    board.placeShip(new Ship(1), [2,1], "x")
    board.placeShip(new Ship(1), [7,2], "x")
    board.placeShip(new Ship(1), [3,7], "x")
    board.placeShip(new Ship(2), [1,3], "x")
    board.placeShip(new Ship(2), [4,1], "x")
    board.placeShip(new Ship(2), [8,8], "y")
    board.placeShip(new Ship(3), [7,0], "y")
    board.placeShip(new Ship(3), [1,9], "y")
    board.placeShip(new Ship(4), [6,5], "x")
}