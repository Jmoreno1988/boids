Boid.prototype.constructor = Boid

function Boid(config) {
    this.myWorld = config.world;
    this.geoData = config.geoData || {
        position: new Vector(0, 0),
        velocity: new Vector(0, 0),
        acceleration: new Vector(0, 0)
    };
    this.physicLimits = config.physicLimits || {
        velocityMax: 5,
        accelerationMax: 5
    };
    this.colour = config.colour || "tomato";
    this.mass = config.mass || 2;
    this.lastTime = this.currentTime = new Date();
    this.currentTime.setSeconds(this.currentTime.getSeconds() - 100000);
    this.behaviour = config.behaviour || "separation"
    this.brain = new Brain({
        body: this,
        vision: config.vision || 60,
        geoData: this.geoData,
        behaviour: this.behaviour
    });
}

Boid.prototype.setBehaviour = function (behaviour) {
    this.brain.setBehaviour(behaviour);
}

Boid.prototype.getBehaviour = function (behaviour) {
    return this.brain.getBehaviour();
}

Boid.prototype.move = function () {
    var currentTime = this.myWorld.getCurrentTime();
    this.updatePhysics(currentTime);
};

Boid.prototype.updatePhysics = function (currentTime) {
    this.lastTime = this.currentTime;
    this.currentTime = currentTime;
    this.geoData.acceleration = this.brain.desiredAcceleration();
    this.geoData.velocity = this.integrate(this.geoData.velocity, this.geoData.acceleration, this.myWorld.getDeltaT());
    this.geoData.position = this.integrate(this.geoData.position, this.geoData.velocity, this.myWorld.getDeltaT() * this.myWorld.getVelWorld());
};

Boid.prototype.integrate = function (primitive, diff, delta) {
    return primitive.add(diff.scale(delta));
};

Boid.prototype.draw = function () {
    var ctx = this.myWorld.getCtx();

    // Cuerpo interior
    ctx.fillStyle = this.colour;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // Cuerpo exterior
    ctx.beginPath();
    ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), 12, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

    // Direccion
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.geoData.position.getX(), this.geoData.position.getY());
    ctx.lineTo(this.geoData.position.getX() + this.geoData.velocity.getX(), this.geoData.position.getY() + this.geoData.velocity.getY());
    ctx.closePath();
    ctx.stroke();

    // Aceleracion
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.geoData.position.getX(), this.geoData.position.getY());
    ctx.lineTo(this.geoData.position.getX() + this.geoData.acceleration.getX(), this.geoData.position.getY() + this.geoData.acceleration.getY());
    ctx.closePath();
    ctx.stroke();
    
};

Boid.prototype.run = function () {
    this.brain.listVisibleBoids();
    this.move();
    this.draw();
};


/***** Getters & Setters *****/
Boid.prototype.getBrain = function () {
    return this.brain;
};

Boid.prototype.getPosition = function () {
    return this.geoData.position;
};

Boid.prototype.getListVisibleBoids = function () {
    return this.brain.listVisibleBoids();
};

Boid.prototype.getVelocity = function () {
    return this.geoData.velocity;
};