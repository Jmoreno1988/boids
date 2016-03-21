WorkerBrain.prototype = new Brain
WorkerBrain.prototype.constructor = WorkerBrain
WorkerBrain.prototype.super = Brain

function WorkerBrain(config) {
	Brain.call(this, config);

	this.teamBoids = config.teamBoids;
	this.objective = null;
	this.positionObjective = null;
	this.deliveryPoint = config.castle.getPosition();
	this.isLoaded = false;
	this.collectionDistance = 15;
	this.seeker = null;
	this.actualState = "waiting" 
}

WorkerBrain.prototype.transportBehavior = function () {
    switch(this.actualState) {
    	case "waiting":
    		this.geoData.velocity = new Vector(1,1);
    		return new Vector(0, 0);
    	break;

    	case "workingToGo":
    		if(this.geoData.position.module(this.positionObjective) < this.collectionDistance)
    			this.actualState = "workingReturn";
    		return this.geoData.position.director(this.positionObjective).unit().scale(30).sub(this.geoData.velocity); // TODO: seekBehavior
    	break;

		case "workingReturn":
			this.objective.setIsTouch(true);

			if(this.seeker != null) {
    			this.seeker.setActualState("newSearch");
				this.seeker = null;
			}

			if(this.geoData.position.module(this.deliveryPoint) < this.collectionDistance)
				this.actualState = "emptying";
			this.objective.setPosition(this.geoData.position);
    		return this.geoData.position.director(this.deliveryPoint).unit().scale(30).sub(this.geoData.velocity); // TODO: seekBehavior
		break;

		case "emptying":
			this.body.myWorld.eraseFood(this.objective.getId());
			this.actualState = "waiting";
			return new Vector(0, 0);
		break;
    }
}

WorkerBrain.prototype.setObjective = function(newObjective, seeker) {
	this.seeker = seeker;
	this.objective = newObjective;
	this.positionObjective = newObjective.getPosition();
}

WorkerBrain.prototype.setActualState = function(newValue) {
	this.actualState = newValue;
}

WorkerBrain.prototype.getActualState = function() {
	return this.actualState;
}

