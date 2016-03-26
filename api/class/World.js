World.prototype.constructor = World;

function World(config) {
    this.idWorld = config.idWorld;
    this.canvas = document.getElementById(this.idWorld);
    this.ctx = this.canvas.getContext("2d");
    this.currentTime = new Date().getTime();
    this.lastTime = new Date(this.currentTime - 1000);
    this.fps = 0;
    this.showPanelBenchmark = config.showPanelBenchmark || false;
    this.listBoids = config.listBoids || [];
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.velWorld = config.velWorld || 6;

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

World.prototype.newFixed = function (param) {
    var bh = "separation";

    if (arguments[0] instanceof String)
        bh = param;

    var fixed = param || new Fixed({
        world: this,
        geoData: {
            position: new Vector(this.random(0, 300), this.random(0, 200)),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        },
        behaviour: bh
    });

    this.listBoids.push(fixed);
};

World.prototype.clearCanvas = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

World.prototype.updateTime = function () {
    this.deltaT = (this.currentTime - this.lastTime) / 1000;// Objetivo 0.1
    this.lastTime = this.currentTime;
    this.currentTime = Date.now();
    this.fps = 1 / this.deltaT;
}

World.prototype.updatePanelBenchmark = function () {
    document.querySelector('#panelBenchmark').style.display = "block";
    document.querySelector('#totalBoids').innerHTML = this.listBoids.length;
    document.querySelector('#fps').innerHTML = Math.round(this.fps);
}

World.prototype.draw = function () {
    if(this.showPanelBenchmark)
        this.updatePanelBenchmark();
    this.clearCanvas();

    //path.draw(this.ctx)
};

World.prototype.run = function () {
    this.updateTime();
    
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

World.prototype.getDeltaT = function() {
    return this.deltaT;
}

World.prototype.getVelWorld = function() {
    return this.velWorld;
}

World.prototype.getCanvas = function() {
    return this.canvas;
}

World.prototype.getCtx = function() {
    return this.ctx;
}