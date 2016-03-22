Brain.prototype.constructor = Brain;

function Brain(config) {
    if(!config)
        return;

    this.body = config.body;
    this.geoData = config.geoData;
    this.objective = null;
    this.behavior = config.behavior || [];
    this.visibleBoids = [];
    this.vision = config.vision;

    this.theta = 0;
    this.elapsedTime = 0;

    // Animal
    this.showExclamation = false;
}

Brain.prototype.setBehavior = function (newValue) {
    this.behavior = newValue;
}

Brain.prototype.desiredAcceleration = function () {
    var temp = [new Vector(0, 0)];
    var callMethod = "";
    var x = 0, 
        y = 0;

    if (typeof (this.behavior) === "string") {
        callMethod = "this." + this.behavior + "Behavior()";
        emp.push(eval(callMethod));
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
    if(this.objective == null)
        return new Vector(0, 0);

    //if(this.geoData.position.module(this.objective) < this.vision)
    //    return new Vector(0, 0);//this.geoData.velocity = this.geoData.velocity.unit().scale(this.geoData.position.module(this.objective));
    return this.geoData.position.director(this.objective).unit().scale(30).sub(this.geoData.velocity);
};

Brain.prototype.addBehavior = function (newBehavior) {
    this.behavior.push(newBehavior)
};

/***** Getters & Setters *****/
Brain.prototype.setObjective = function (newValue) {
    this.objective = newValue;
};

Brain.prototype.getObjective = function (newValue) {
    return this.objective
};

Brain.prototype.getVision = function (newValue) {
    return this.vision;
};