var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth-10;
var height = canvas.height = window.innerHeight-10;

var runners = [];


function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
  }
function Runner(x,y,vel,color,name){
    this.x=x;
    this.y=y;
    this.vel=vel;
    this.color=color;a
    this.laps=0;
    this.name=name;
}

Runner.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(this.x,this.y,10,10);
    ctx.fill();
  }

Runner.prototype.run = function(){
    if (this.x+this.vel > canvas.width){
        this.laps++;
        if (this.laps==5){
            alert(this.name + " wins!");
        }
        else {
        this.x=0;
        this.vel=random(5,10);
        
        }
      }
    else this.x+=this.vel;
}


for(var j=0; j<5; j++){
var runner = new Runner(
    5,
    j*((height-40)/4)+10,
    random(5,10),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    "Runner"+(j+1),
  );
  
  runners.push(runner);
}

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    

    for (var i = 0; i < runners.length; i++) {
        runners[i].draw();
        runners[i].run();
    }
    requestAnimationFrame(loop);
  }
  
  loop();
