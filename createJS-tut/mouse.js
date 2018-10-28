
function Mouse(color){
	this.color = color;
	this.dead = false;
}


Mouse.prototype.die = function(){
	this.dead = true;
	console.log("this mouse is died");
};


module.exports = Mouse;