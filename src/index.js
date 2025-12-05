import "./styles.css";
import Player from "./Modules/player";
import Gameboard from './Modules/gameboard'
import { initializeUI } from "./Modules/uiInteractions";

const player1 = new Player("real", new Gameboard())
const player2 = new Player("real", new Gameboard())

initializeUI()