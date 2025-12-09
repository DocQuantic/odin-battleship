import "./styles.css";
import Player from "./Modules/player";
import Gameboard from './Modules/gameboard'
import Ship from "./Modules/ship";
import { initializeUI } from "./Modules/uiInteractions";

const players = {
    player1: new Player("real", "1", new Gameboard()),
    player2: new Player("real", "2", new Gameboard())
}

populateBoards()
initializeUI(players)


function populateBoards(){
    const board1 = players.player1.gameboard;

    board1.placeShip(new Ship(1), [0,1], "x")
    board1.placeShip(new Ship(1), [2,1], "x")
    board1.placeShip(new Ship(1), [7,2], "x")
    board1.placeShip(new Ship(1), [3,7], "x")
    board1.placeShip(new Ship(2), [1,3], "x")
    board1.placeShip(new Ship(2), [4,1], "x")
    board1.placeShip(new Ship(2), [8,8], "y")
    board1.placeShip(new Ship(3), [7,0], "y")
    board1.placeShip(new Ship(3), [1,9], "y")
    board1.placeShip(new Ship(4), [6,5], "x")
    
    const board2 = players.player2.gameboard;

    board2.placeShip(new Ship(1), [0,1], "x")
    board2.placeShip(new Ship(1), [2,1], "x")
    board2.placeShip(new Ship(1), [7,2], "x")
    board2.placeShip(new Ship(1), [3,7], "x")
    board2.placeShip(new Ship(2), [1,3], "x")
    board2.placeShip(new Ship(2), [4,1], "x")
    board2.placeShip(new Ship(2), [8,8], "y")
    board2.placeShip(new Ship(3), [7,0], "y")
    board2.placeShip(new Ship(3), [1,9], "y")
    board2.placeShip(new Ship(4), [6,5], "x")
}