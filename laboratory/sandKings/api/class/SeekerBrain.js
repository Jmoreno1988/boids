SeekerBrain.prototype = new Brain
SeekerBrain.prototype.constructor = SeekerBrain
SeekerBrain.prototype.super = Brain

function SeekerBrain(config) {
	Brain.call(this, config);

    this.teamBoids = config.teamBoids;
    this.showExclamation = false;
    this.states = ["searching", "waiting"];
    this.actualState = this.states[0];
    this.actualObject = null;
    this.isFindWorker = false;

}

SeekerBrain.prototype.searchObjectiveBehavior = function () {
    var food = this.body.myWorld.getListFood();

    switch(this.actualState) {
        case "searching":
            for(var i = 0; i < food.length; i++)
                if(this.geoData.position.module(food[i].getPosition()) < this.vision - 6 && food[i].getIsTouch() == false) {
                    this.actualObject = food[i];
                    this.actualState = "pendingWorkers";
                }
        break;

        case "pendingWorkers": 
            this.geoData.velocity = new Vector(0,0);
            this.showExclamation = true;
        break;

        case "waiting":
            //this.communicateToWorkers(this.actualObject);
            this.geoData.velocity = new Vector(0,0);
            this.showExclamation = true;
        break;

        case "newSearch":
            this.showExclamation = false;
            this.isFindWorker = false;
            this.behaviour = ["wander"];
            this.actualState = "searching";
        break;
        
    }

    // Se deja por compatibilidad con el resto de comportamientos
    //return new Vector(0,0);
};


SeekerBrain.prototype.communicateToWorkers = function(newObjective) {
    var newObjective = newObjective;
    
    for(var i = 0; i < this.teamBoids.length; i++)
        if(this.teamBoids[i].getBrain() instanceof WorkerBrain && this.teamBoids[i].getBrain().getActualState() == "waiting") {
            this.teamBoids[i].getBrain().setObjective(newObjective, this);
            this.teamBoids[i].getBrain().setActualState("workingToGo")
            this.isFindWorker = true;        
        }
}


SeekerBrain.prototype.setActualState = function(newValue) {
    this.actualState = newValue;
}

SeekerBrain.prototype.getActualState = function(newValue) {
    return this.actualState;
}

SeekerBrain.prototype.getActualObject = function(newValue) {
    return this.actualObject;
}