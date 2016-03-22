WorkerBrain.prototype = new Brain
WorkerBrain.prototype.constructor = WorkerBrain
WorkerBrain.prototype.super = Brain

function WorkerBrain(config) {
	Brain.call(this, config);

	this.positionObjective = null;
	this.deliveryPoint = new Vector(0,0);
}

WorkerBrain.prototype.dead = function(newValue) { 
	var id = null;
	for(var i = 0; i < this.world.listBoids.length; i++)
		if(this.world.listBoids[i] == this.id)
			this.world.listBoids.splice(i,1);
}

WorkerBrain.prototype.setActualState = function(newValue) {
	this.actualState = newValue;
}

WorkerBrain.prototype.getActualState = function() {
	return this.actualState;
}

