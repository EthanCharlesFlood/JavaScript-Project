import GameObject from './object.js';

class Obstacle extends GameObject {
  constructor(canvasWidth, canvasHeight, ctx, pc) {
    super(canvasWidth, canvasHeight);
    this.context = ctx;
    this.pc = pc;
    this.ramping = 5;
    this.obstacleWords = [
                        ["REJECTED", 50],
                        ["HIRING FREEZE", 160],
                        ["BAD CULTURAL FIT", 220],
                        ["UNDER-QUALIFIED", 220],
                        ["'DIFFERENT DIRECTION'", 341],
                        ["GET OUT OF MY OFFICE", 280],
                        ["THE POSITION HAS BEEN FILLED", 400],
                        ["PLEASE DON'T CONTACT US AGAIN", 444],
                        ["WHO REFERED YOU?", 280]];
    this.wordArr = this.obstacleWords[Math.floor(Math.random() * 8)];
    this.word = this.wordArr[0];
    this.dx = Math.floor( Math.random() * 5) + 4;
    this.vector = [1,-1][Math.floor(Math.random() * 2)];
    this.draw = this.draw.bind(this);
    this.harmful = true;
  }

  hitbox() {
    return {
      x1: this.x,
      x2: this.x + this.wordArr[1],
      y1: this.y,
      y2: this.y + 15,
    };
  }

  reset() {
    this.x = 1000;
    this.wordArr = this.obstacleWords[Math.floor(Math.random() * 8)];
    this.vector = [1,-1][Math.floor(Math.random() * 2)];
    this.dx = Math.floor( Math.random() * 5) + 4;
    this.ramping = 5;
  }

  draw() {
    if (this.x < -500) {
      this.x = 1000;
      this.wordArr = this.obstacleWords[Math.floor(Math.random() * 8)];
      this.word = this.wordArr[0];
      this.vector = [1,-1][Math.floor(Math.random() * 2)];
      if (this.pc.collected > 12 && this.pc.collected % 3 === 0) {
        this.ramping += 1;
      }
      this.dx = Math.floor( Math.random() * 5) + this.ramping;
    }
    this.x -= this.dx;
    this.context.beginPath();
    this.context.fillText(this.word, this.x, this.y);
    this.context.fillStyle = "#FFFFFF";
    this.context.closePath();
  }
}

export default Obstacle;
