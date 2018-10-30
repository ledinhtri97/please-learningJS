
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: innerWidth/2,
  y: innerHeight/2
}

const color = ["#C2E7F2","#F1F0E2", "#D9BB93", "#F25652", "#233D4D", "#FE7F2D", "#FCCA46", "#A1C181", "#579C87","#03A1DA","#86BF28","#CEDA07","#F3B129","#F12522"];

const backgroundGradient = c.createLinearGradient(0,0,120,canvas.height);
backgroundGradient.addColorStop(0,"#171e26");
backgroundGradient.addColorStop(1,"#3f586b");

// resize browser
document.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  init();
});
// function random from range
function randomIntFromRange(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// function random color
function randomColor(colors){
  return colors[Math.floor(Math.random() * colors.length)];
}
// function distance
function distance (x1, y1, x2, y2){
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// object
function Star(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  // speed
  this.velocity = {
    x:  randomIntFromRange(-4,4),
    y: 3
  }
  // ma sat
  this.friction = 0.8;
  this.gravity = 1;
}

Star.prototype.draw = function(){
  c.save();
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
  c.fillStyle = this.color;
  c.shadowColor = this.color;//"#e3eaef";
  c.shadowBlur = 30;
  c.fill();
  c.closePath();
  c.restore();
}

Star.prototype.update = function(){
  this.draw();

  if(this.y + this.radius >= canvas.height){
    this.velocity.y = - this.velocity.y * this.friction;
    this.shatter();
  }else{
    this.velocity.y += this.gravity;
  }
  if(this.x + this.radius >= canvas.width || this.x <= 0){
    this.velocity.x = -this.velocity.x;
  }
  this.y += this.velocity.y;
  this.x += this.velocity.x;
};

Star.prototype.shatter = function(){
  this.radius -=3;
  for(let i = 0; i< 8 ; i++){
    miniStars.push(new MiniStar(this.x, this.y, 2, this.color))
  }
}

function MiniStar(x, y, radius, color){
  Star.call(this, x, y, radius, color);
  this.velocity = {
    x: randomIntFromRange(-5,5),
    y: randomIntFromRange(-15,15)
  }
  this.friction = 0.8;
  this.gravity = 0.1;
  this.ttl = 100;
  this.opacity = 1;
}
MiniStar.prototype.draw = function(){
  c.save()
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
  //c.fillStyle = `rgba(227,234,239, ${this.opacity})`;
  c.fillStyle = this.color;
  c.shadowColor = this.color;//"#e3eaef";
  c.shadowBlur = 20;
  c.fill();
  c.closePath();
  c.restore();
}

MiniStar.prototype.update = function(){
  this.draw();
  
  if(this.y + this.radius > canvas.height){
    this.velocity.y = - this.velocity.y * this.friction;
  }else{
    this.velocity.y += this.gravity;
  }
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.opacity -= 1/this.ttl;
};

/*moutain*/
function createMountainRange(mountainAmount, height,  color) {
  for (var i = 0; i < mountainAmount; i++) {
		var mountainWidth = canvas.width / mountainAmount;
		// Draw triangle
		c.beginPath();
		c.moveTo(i * mountainWidth, canvas.height);
		c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);

		// Triangle peak
		c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
		c.lineTo(i * mountainWidth - 325, canvas.height);

		c.fillStyle = color;
		c.fill();
		c.closePath();
	}
}
/**/

// init
let stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawRate = 75;
function init(){
  stars = [];
  miniStars = [];
  backgroundStars = [];
  
  for(let i=0; i<250; i++){
     const randX = Math.floor(Math.random() * canvas.width);
     const randY = Math.floor(Math.random() * canvas.height );
     const randRadius = Math.floor(Math.random()*4);
     backgroundStars.push(new Star(randX, randY, randRadius, color[Math.floor(Math.random() * color.length)]));
  }
}
function createLinearGradientMoutain(color, val){
  const colorMoutain = c.createLinearGradient(0,0,0,canvas.height);
  colorMoutain.addColorStop(1,"black");
  colorMoutain.addColorStop(val,color);
  colorMoutain.addColorStop(0,"white");
  return colorMoutain;
}
function animate(){
  window.requestAnimationFrame(animate);
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);
  

  backgroundStars.forEach(function(bgStar) {
      bgStar.draw();
  });
  
  createMountainRange(1, canvas.height - 50, createLinearGradientMoutain('#4F4F4F',.2));
	createMountainRange(2, canvas.height - 100,  createLinearGradientMoutain('#363636',.3));
	createMountainRange(3, canvas.height - 300 , createLinearGradientMoutain("#1C1C1C",.44));
  
  stars.forEach(function(star, index){
    star.update();
    // neu star = 0
    if(star.radius == 0)
      stars.splice(index,1)
  });
  
  miniStars.forEach(function(miniStar, index){
    miniStar.update();
    if(miniStar.ttl == 0)
      miniStars.splice(index,1)
  });
  
  ticker++;
  if(ticker % randomSpawRate == 0){
    const x = Math.random() * canvas.width;
    stars.push(new Star(x, -100, 30,color[Math.floor(Math.random() * color.length)]));
    // stars.push(new Star(x, -100, 30,'white'));
    randomSpawRate = randomIntFromRange(50,90);
  }
}

init();
animate();
