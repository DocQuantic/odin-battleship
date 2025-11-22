export class Ship {
  constructor(length){
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit++;
    this.isSunk();
  }

  isSunk(){
    this.sunk = this.timesHit >= this.length ? true : false;
  }
}
