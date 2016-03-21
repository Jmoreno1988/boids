Brain.prototype.constructor = Brain;

function Brain(config) {
    if(!config)
        return;

    this.body = config.body;
    this.geoData = config.geoData;
    this.objective = new Vector(200,200);
    this.behaviour = config.behaviour;
    this.visibleBoids = [];
    this.vision = config.vision;

    this.theta = 0;
    this.elapsedTime = 0;

    // Animal
    this.showExclamation = false;
}

Brain.prototype.setBehavior = function () {

}

Brain.prototype.desiredAcceleration = function () {
    var temp = [new Vector(0, 0)];
    var callMethod = "";
    var x = 0, 
        y = 0;

    if (typeof (this.behaviour) === "string") {
        callMethod = "this." + this.behaviour + "Behavior()";
        emp.push(eval(callMethod));
    } else if (this.behaviour instanceof Array) {
        for (var i = 0; i < this.behaviour.length; i++) {
            callMethod = "this." + this.behaviour[i] + "Behavior()";
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
    
};


/***** Getters & Setters *****/
Brain.prototype.setObjective = function (newValue) {
    this.objetive = newValue;
};

Brain.prototype.getVision = function (newValue) {
    return this.vision;
};