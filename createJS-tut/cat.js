function Cat(){
	this.stomatch = [];
}

Cat.prototype.eat = function(mouse){
	this.stomatch.push(mouse);
	mouse.die();
}


module.exports = Cat;