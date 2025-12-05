export default class Gameboard{
    constructor(){
        this.width = 10
        this.height = 10
        this.grid = []
        this.ships = []
        this.isGameOver = false
        this.sunkShips = 0
        for(let i=0; i<this.height; i++){
            this.grid[i] = []
            for(let j=0; j<this.width; j++){
                this.grid[i][j] = null
            }
        }
    }

    placeShip(ship, pos, dir){
        this.ships.push(ship)

        if(dir === "x"){
            for(let i=0; i<ship.length; i++){
                this.grid[pos[0]][pos[1]+i] = ship;
            }
        }else if(dir === "y"){
            for(let i=0; i<ship.length; i++){
                this.grid[pos[0]+i][pos[1]] = ship;
            }
        }
    }

    receiveAttack(pos){
        if(this.grid[pos[0]][pos[1]] !== null & this.grid[pos[0]][pos[1]] !== 0 & this.grid[pos[0]][pos[1]] !== 1){
            const ship = this.grid[pos[0]][pos[1]]
            ship.hit()
            this.grid[pos[0]][pos[1]] = 1
        }else{
            this.grid[pos[0]][pos[1]] = 0
        }

        this.checkShipsStatus()
    }

    checkShipsStatus(){
        this.sunkShips = 0
        this.ships.forEach((ship) => {
            if(ship.isSunk()){
                this.sunkShips += 1
            }
        })
        if(this.sunkShips === this.ships.length){
            this.isGameOver = true
        }
    }
}