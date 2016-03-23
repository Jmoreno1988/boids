WorkerBrain.prototype = new Brain
WorkerBrain.prototype.constructor = WorkerBrain
WorkerBrain.prototype.super = Brain

function WorkerBrain(config) {
	Brain.call(this, config);

	this.hiveMind = config.hiveMind ||null;
	this.positionObjective = null;
	this.deliveryPoint = new Vector(0,0);
}

WorkerBrain.prototype.dead = function() { 
	for(var i = 0; i < this.body.myWorld.listBoids.length; i++) {
		if(this.body.myWorld.listBoids[i].id == this.body.id)
			this.body.myWorld.listBoids.splice(i, 1);
	}

	for(var i = 0; i < this.hiveMind.listBoids.length; i++) {
		if(this.hiveMind.listBoids[i].id == this.body.id)
			this.hiveMind.listBoids.splice(i, 1);
	}
		
}

WorkerBrain.prototype.setActualState = function(newValue) {
	this.actualState = newValue;
}

WorkerBrain.prototype.getActualState = function() {
	return this.actualState;
}

