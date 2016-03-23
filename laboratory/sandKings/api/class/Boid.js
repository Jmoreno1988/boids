Boid.prototype.constructor = Boid

function Boid(config) {
    if(!config)
        return;

    this.id = config.id || null;
    this.myWorld = config.world;
    this.geoData = config.geoData || {
        position: new Vector(0, 0),
        velocity: new Vector(0, 0),
        acceleration: new Vector(0, 0)
    };
    this.physicLimits = config.physicLimits || {
        velocityMax: 30,
        accelerationMax: 30
    };
    this.colour = config.colour || "tomato";
    this.mass = config.mass || 2;
    this.behavior = config.behavior || "separation"
    this.brain = config.brain || new Brain({
        body: this,
        vision: config.vision || 60,
        geoData: this.geoData,
        behavior: this.behavior
    });
     this.sizeBody = config.sizeBody || 10;

    this.img = new Image();
    this.img.src = "api/img/arrow.png";

    // Animal
    this.imgExclamation = new Image();
    this.imgExclamation.src = "api/img/exclamation.png";

    this.inHouse = false;
}

Boid.prototype.setBehaviour = function (behavior) {
    this.brain.setBehaviour(behavior);
}

Boid.prototype.getBehaviour = function (behavior) {
    return this.brain.getBehaviour();
}

Boid.prototype.move = function () {
    var currentTime = this.myWorld.getCurrentTime();
    this.updatePhysics(currentTime);
};

Boid.prototype.updatePhysics = function (currentTime) {
    this.geoData.acceleration = this.brain.desiredAcceleration();
    this.geoData.velocity = Math.integrate(this.geoData.velocity, this.geoData.acceleration, this.myWorld.getDeltaT());
    this.geoData.position = Math.integrate(this.geoData.position, this.geoData.velocity, this.myWorld.getDeltaT() * this.myWorld.getVelWorld());

    this.clipAcceleration();
    this.clipVelocity();
    this.regulatePosition();
};

Boid.prototype.clipVelocity = function() {
    var v = new Vector(0,0); 

    if(v.module(this.geoData.velocity) > this.physicLimits.velocityMax)
        this.geoData.velocity = this.geoData.velocity.unit().scale(this.physicLimits.velocityMax);
}

Boid.prototype.clipAcceleration = function() {
    var v = new Vector(0,0); 

    if(v.module(this.geoData.acceleration) > this.physicLimits.accelerationMax)
        this.geoData.acceleration = this.geoData.acceleration.unit().scale(this.physicLimits.accelerationMax);
}

Boid.prototype.regulatePosition = function() {
    var p = this.geoData.position;
    var c = this.myWorld.getCanvas();

    if(p.getX() > c.width) p.setX(c.width - 1);
    if(p.getX() < 0) p.setX(1);
    if(p.getY() > c.height) p.setY(c.height - 1);
    if(p.getY() < 0) p.setY(1);
}

Boid.prototype.draw = function () {
    if(!this.inHouse){
    var ctx = this.myWorld.getCtx();
/*
    var angle = Math.atan2(this.geoData.velocity.getY(), this.geoData.velocity.getX());

    ctx.translate(this.geoData.position.getX(), this.geoData.position.getY());
    ctx.rotate(1.570792);
    ctx.rotate(angle);
    ctx.drawImage( this.img, -9, -12.5);
    ctx.rotate(-angle);
    ctx.rotate(-1.570792);
    ctx.translate(-this.geoData.position.getX(), -this.geoData.position.getY());
*/

    // Cuerpo interior
    ctx.fillStyle = this.colour;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), this.sizeBody -2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    // Cuerpo exterior
    ctx.beginPath();
    ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), this.sizeBody, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();

    /*
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

    // Vision
    if(this.brain instanceof SeekerBrain) {
        ctx.beginPath();
        ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), this.brain.vision, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }
    */
    // Exclamacion
    if(this.brain.showExclamation == true)
        ctx.drawImage(this.imgExclamation, this.geoData.position.getX() - 8, this.geoData.position.getY() - 26);
    }

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

Boid.prototype.setBrain = function (newBrain) {
    this.brain = newBrain;
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

Boid.prototype.getSizeBody = function() {
    return this.sizeBody;
}