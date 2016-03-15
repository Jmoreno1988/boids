World.prototype.constructor = World

function World(config) {
    this.idWorld = config.idWorld;
    this.canvas = document.getElementById(this.idWorld);
    this.ctx = this.canvas.getContext("2d");
    // this.currentTime = new Date();
    // this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    this.listBoids = config.listBoids || [];
    this.ctx.canvas.width = 600;
    this.ctx.canvas.height = 600;

    // Listeners
    //this.canvas.addEventListener('mousemove', this.canvasMouseMove.bind(this));
}

World.prototype.canvasMouseMove = function (evt) {
    var x = evt.offsetX;
    var y = evt.offsetY;

    for (var i = 0; i < this.listBoids.length; i++)
        this.listBoids[i].getBrain().setObjetive(new Vector(x, y));
}

World.prototype.newBoid = function (param) {
    var bh = "separation";

    if (arguments[0] instanceof String)
        bh = param;

    var boid = param || new Boid({
        world: this,
        geoData: {
            position: new Vector(this.random(0, 300), this.random(0, 200)),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        },
        behaviour: bh
    });

    this.listBoids.push(boid);
};

World.prototype.clearCanvas = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

World.prototype.random = function (n1, n2) {
    return Math.round(Math.random() * (n2 - n1) + parseInt(n1));
};

World.prototype.draw = function () {
    this.clearCanvas();
};

World.prototype.run = function () {
    this.currentTime = new Date();
    this.draw();

    for (var i = 0; i < this.listBoids.length; i++)
        this.listBoids[i].run();
    
    requestAnimationFrame(function () {
        return this.run();
    }.bind(this));
};

/***** Getters & Setters *****/
World.prototype.setListBoids = function (newValue) {
    this.listBoids = newValue;
};

World.prototype.getListBoids = function () {
    return this.listBoids;
};

World.prototype.getCtx = function () {
    return this.ctx;
};

World.prototype.getCurrentTime = function () {
    return this.currentTime;
};