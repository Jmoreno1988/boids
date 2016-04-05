Brain.prototype.constructor = Brain;

function Brain(config) {
    this.body = config.body;
    this.geoData = config.geoData;
    this.physicLimits = config.physicLimits || {};
    this.objective = null;
    this.behavior = config.behavior;
    this.visibleBoids = [];
    this.vision = config.vision;

    this.theta = 0;
    this.elapsedTime = 0;

    this.pathForward = null;
    this.actualNode = 0;
}

Brain.prototype.setBehavior = function () {

}

Brain.prototype.desiredAcceleration = function () {
    var temp = [new Vector(0, 0)];
    var callMethod = "";
    var x = 0, 
        y = 0;

    if (typeof (this.behavior) === "string") {
        callMethod = "this." + this.behavior + "Behavior()";
        temp.push(eval(callMethod));
    } else if (this.behavior instanceof Array) {
        for (var i = 0; i < this.behavior.length; i++) {
            callMethod = "this." + this.behavior[i] + "Behavior()";
            temp.push(eval(callMethod));
        }
    }

    for (var i = 0; i < temp.length; i++) {
        x += temp[i].getX();
        y += temp[i].getY();
    }

    return new Vector(x / temp.length, y / temp.length);
};

Brain.prototype.listVisibleBoids = function () {
    var vision = this.vision * this.vision;
    var listBoids = this.body.myWorld.getListBoids();
    this.visibleBoids = [];

    for (var i = 0; i < listBoids.length; i++) 
        if (listBoids[i].getPosition().getX() != this.geoData.position.getX() && listBoids[i].getPosition().getY() != this.geoData.position.getY()) {
            var x1 = this.geoData.position.getX();
            var y1 = this.geoData.position.getY();
            var dx = listBoids[i].getPosition().getX() - x1;
            var dy = listBoids[i].getPosition().getY() - y1;

            if (dx * dx + dy * dy < vision)
                this.visibleBoids.push(listBoids[i]);
        }
};

Brain.prototype.separationBehavior = function () {
    if (this.visibleBoids.length == 0)
        return new Vector(0, 0);
    
    var vBoids = this.visibleBoids;
    var x = 0;
    var y = 0;
    var count = 0;

    for (var i = 0; i < vBoids.length; i++) {
        if (this.body.geoData.position.module(vBoids[i].geoData.position) < vBoids[i].getSizeBody() + this.body.getSizeBody()) {
            var targetAt = vBoids[i].getPosition().sub(this.geoData.position);
            x += targetAt.getX();
            y += targetAt.getY();
            count++;
        }
    }

    if (count > 0)
        return new Vector((x / count) * 8, (y / count) * 8).scale(-1);
    else
        return new Vector(0, 0);
};

Brain.prototype.cohesionBehavior = function () {
    if (this.visibleBoids.length == 0)
        return new Vector(0, 0);

    var vBoids = this.visibleBoids;
    var x = 0;
    var y = 0;
    var count = 0;

    for (var i = 0; i < vBoids.length; i++) {
        var targetAt = vBoids[i].getPosition().sub(this.geoData.position);
        x += targetAt.getX();
        y += targetAt.getY();
        count++;
    }

    if (count > 0)
        return new Vector((x / count) / 4, (y / count) / 4);
    else
        return new Vector(0, 0);
};

Brain.prototype.alignmentBehavior = function () {
    if (this.visibleBoids.length == 0)
        return new Vector(0, 0);

    var vBoids = this.visibleBoids;
    var x = 0;
    var y = 0;
    var count = 0;

    for (var i = 0; i < vBoids.length; i++) {
        
            var targetAt = vBoids[i].getVelocity().sub(this.geoData.velocity);
            x += targetAt.getX();
            y += targetAt.getY();
            count++;
    }

    if (count > 0)
        return new Vector((x / count) * 6, (y / count) * 6);
    else
        return new Vector(0, 0);
};

Brain.prototype.wanderBehavior = function () {
    this.elapsedTime += this.body.myWorld.getDeltaT();
    
    if(this.elapsedTime > 1) {
        this.theta += 1 * (Math.random() * 2 - 1);
        this.elapsedTime = 0;
    }

    return new Vector(this.vision * Math.cos(this.theta), this.vision * Math.sin(this.theta));
};

Brain.prototype.seekBehavior = function () {
    if(!this.objective)
        return new Vector(0, 0);

    var position = this.geoData.position;
    var objective = this.objective;
    var accelerationMax = this.physicLimits.accelerationMax;
    var velocity = this.geoData.velocity;

    if(this.objective.constructor === Boid)
        objective = this.objective.getPosition();

    return position.director(objective).unit().scale(accelerationMax + 100).sub(velocity);
};


Brain.prototype.fleeBehavior = function () {
    if(!this.objective)
        return new Vector(0, 0);

    var position = this.geoData.position;
    var objective = this.objective;
    var accelerationMax = this.physicLimits.accelerationMax;
    var velocity = this.geoData.velocity;

    if(this.objective.constructor === Boid)
        objective = this.objective.getPosition();

    return (position.director(objective).unit().scale(accelerationMax + 100).sub(velocity)).scale(-1);
};

Brain.prototype.pursueBehavior = function () {
    if(!this.objective)
        return new Vector(0, 0);

    var t = 1;
    var position = this.geoData.position;
    var velObjective = this.objective.getVelocity();
    var velocity = this.geoData.velocity;
    var objective = velObjective.scale(t);
    var accelerationMax = this.physicLimits.accelerationMax;
    //console.log(position.director(objective).unit().scale(accelerationMax + 100).sub(velocity))
    return position.director(objective).unit().scale(accelerationMax + 100).sub(velocity);
};

// TODO: revisar
Brain.prototype.pathFollowingBehavior = function () {
    if(!this.pathForward)
        return new Vector(0, 0);

    var positionNode = this.pathForward.getNode(this.actualNode);
    var vector = this.geoData.position.director(positionNode).unit().scale(this.physicLimits.accelerationMax).sub(this.geoData.velocity);
    
    // Next node
    if(this.body.geoData.position.module(positionNode) < this.pathForward.getRadius())
        this.actualNode++;

    // Reset path
    if(this.actualNode == this.pathForward.getNodes().length)
        this.actualNode = 0;

    return vector.scale(3);
}


// TODO: interseccion segmento-segmento y segmento-conica
Brain.prototype.obstacleAvoidanceBehavior = function () {
    // Circles
    for(var i = 0; i < this.body.myWorld.getListObstacles().length; i++) {
        var actualObstacle = this.body.myWorld.getListObstacles()[i];
        var x1 = this.geoData.position.getX();
        var y1 = this.geoData.position.getY();
        var dx = actualObstacle.getCenter().getX();
        var dy = actualObstacle.getCenter().getY();

        var auxV = this.geoData.velocity.unit().scale(60);
        var securityDistance = new Vector(x1 + auxV.getX(), y1 + auxV.getY());
    
        if(securityDistance.module(actualObstacle.getCenter()) < actualObstacle.getRadius())
            return new Vector(securityDistance.getX() - dx, securityDistance.getY() - dy).unit().scale(100);
    }

    return new Vector(0, 0);
}

Brain.prototype.isInBehaviors = function(behavior) {
    var is = false;

    if (typeof (this.behavior) === "string") {
        if(this.behavior == behavior)
                is = true;
    } else if(this.behavior instanceof Array) {
        for(var i = 0; i < this.behavior.length; i++)
            if(this.behavior[i] == behavior)
                is = true;
    }

    return is;
}


/***** Getters & Setters *****/
Brain.prototype.setObjective = function (newValue) {
    this.objective = newValue;
};

Brain.prototype.getVision = function (newValue) {
    return this.vision;
};

Brain.prototype.setPathForward = function (newPath) {
    this.pathForward = newPath;
};

Brain.prototype.getTheta = function () {
    return this.theta;
};