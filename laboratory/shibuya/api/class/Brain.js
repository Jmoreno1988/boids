Brain.prototype.constructor = Brain

function Brain(config) {
    this.body = config.body;
    this.geoData = config.geoData;
    this.objetive = config.objetive || new Vector(0, 0);
    this.behaviour = config.behaviour;
    this.visibleBoids = [];
    this.vision = config.vision;
}

Brain.prototype.setBehavior = function () {

}

Brain.prototype.desiredAcceleration = function () {
    var scale = 1;
    var temp = [new Vector(0, 0)];
    var callMethod = "";
    var dA = this.geoData.position.director(this.objetive);
    var unit = dA.unit();
    var x = 0, 
        y = 0;

    temp[0] = unit.scale(10).sub(this.geoData.velocity);

    if (this.visibleBoids.length > 0) {
        if (typeof (this.behaviour) === "string") {
            callMethod = "this." + this.behaviour + "Behavior()";
            temp.push(eval(callMethod));
        } else if (this.behaviour instanceof Array) {
            for (var i = 0; i < this.behaviour.length; i++) {
                callMethod = "this." + this.behaviour[i] + "Behavior()";
                temp.push(eval(callMethod));
            }
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
    var vBoids = this.visibleBoids;
    var x = 0;
    var y = 0;
    var count = 0;

    for (var i = 0; i < vBoids.length; i++) {
        if (this.body.geoData.position.module(vBoids[i].geoData.position) < 14) {
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
        return new Vector((x / 4) / count, (y / 4) / count);
    else
        return new Vector(0, 0);
};

Brain.prototype.alignmentBehavior = function () {

};

Brain.prototype.seekBehavior = function () {

};


/***** Getters & Setters *****/
Brain.prototype.setObjetive = function (newValue) {
    this.objetive = newValue;
};