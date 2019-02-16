// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');


var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var left = true;
var right = false;
var down = false;
var up = false;

var dotExists = true;
var hunters = [];
var captures = 0;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
function Snake(x,y,velX,velY,color) {
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.color=color;
}

function Dot(x,y,color){
  this.x=x;
  this.y=y;
  this.color=color;
}

function Hunter (x,y,velX,velY,color) {
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.color=color;
}



Hunter.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.rect(this.x,this.y,10,10);
  ctx.fill();
}

Snake.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.rect(this.x,this.y,10,10);
  ctx.fill();
}

Dot.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.rect(this.x,this.y,10,10);
  ctx.fill();
}

Snake.prototype.update = function() {
  if(up) {
    this.velY = -1;
    this.velX = 0;

  }
  if(down) {
    this.velY = 1;
    this.velX = 0;
  }
  if(left) {
    this.velY = 0;
    this.velX = -1;
  }
  if(right) {
    this.velY = 0;
    this.velX = 1;
  }
  if (this.x+this.velX > canvas.width){
    this.x=0
  }
  else if (this.x+this.velX < 0){
    this.x=canvas.width;
  
  }
  else
  {
    this.x+=this.velX;
  
  }

  if (this.y+this.velY > canvas.height){
    this.y=0
  }
  else if (this.y+this.velY < 0){
    this.y=canvas.height;
  }
  else {
    this.y+=this.velY;
  }
}

Hunter.prototype.move = function() {
  if (this.x+this.velX > canvas.width){
    this.x=0
  }
  else if (this.x+this.velX < 0){
    this.x=canvas.width;
  
  }
  else
  {
    this.x+=this.velX;
  
  }

  if (this.y+this.velY > canvas.height){
    this.y=0
  }
  else if (this.y+this.velY < 0){
    this.y=canvas.height;
  }
  else {
    this.y+=this.velY;
  }

}

document.addEventListener("keydown", moveSnake, false);

function moveSnake(event) {
  if (event.key=='ArrowDown' ) {
    down=true;
    up=false;
    left=false;
    right=false;
  }
  else if (event.key=='ArrowUp') {
    down=false;
    up=true;
    left=false;
    right=false;
  }
  else if (event.key=='ArrowLeft') {
    down=false;
    up=false;
    left=true;
    right=false;
  }
  else if (event.key=='ArrowRight') {
    down=false;
    up=false;
    left=false;
    right=true;
  }
 
}

var snake = new Snake(
  random(0 + 5,width - 5),
  random(0 + 5,height - 5),
  1,
  0,
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
);

var dot = new Dot(
  random(0 + 5,width - 5),
  random(0 + 5,height - 5),
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
);

var hunter = new Hunter(
  random(0 + 5,width - 5),
  random(0 + 5,height - 5),
  captures + 1,
  captures + 1,
  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
);

hunters.push(hunter);

Snake.prototype.eats = function(){
  
  if (this.x < dot.x + 10 &&
    this.x + 10 > dot.x &&
    this.y < dot.y + 10 &&
    this.y + 10 > dot.y) {
      dotExists=false;// collision detected!
  }
}

Hunter.prototype.catch = function(){
  if (this.x < snake.x + 10 &&
    this.x + 10 > snake.x &&
    this.y < snake.y + 10 &&
    this.y + 10 > snake.y) {
      alert('Game Over');
  }
}

function loop(){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  if (dotExists) {
    dot.draw();
  }
  else {
    captures++;
    dot.x =  random(0 + 5,width - 5);
    dot.y =  random(0 + 5,height - 5);
    dot.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
    dotExists = true;
    dot.draw();
    var hunter = new Hunter(
      random(0 + 5,width - 5),
      random(0 + 5,height - 5),
      captures + 1,
      captures + 1,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    );
    
    hunters.push(hunter);
  };
  snake.draw();
  snake.update();
  snake.eats();

  for (var i = 0; i < hunters.length; i++) {
    hunters[i].draw();
    hunters[i].move();
    hunters[i].catch();
  }
  
  requestAnimationFrame(loop);
}

loop();
