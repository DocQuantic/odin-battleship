export default class Player{
    constructor(type, name, gameboard){
        this.type=type;
        this.gameboard = gameboard
        this.name=name
        this.isCurrentPlayer = false;
    }
}