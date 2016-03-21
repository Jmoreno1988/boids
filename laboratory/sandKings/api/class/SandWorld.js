SandWorld.prototype = new World
SandWorld.prototype.constructor = SandWorld
SandWorld.prototype.super = World

function SandWorld(config) {
	World.call(this, config)

	this.teams = [];
	this.listFood = this.generateFood(20);
	this.palms = this.generatePalms(10, 5);
}

SandWorld.prototype.generateFood = function(nFood) {
    var food = [];

    for(var i = 0; i < nFood; i++) 
    	food.push(new Food({ id: i, type: 1, position: new Vector(Math.randomMinMax(0, window.innerWidth), Math.randomMinMax(110, window.innerHeight)) }))

    return food; 
}

SandWorld.prototype.generatePalms = function(nPalms1, nPalms2) {
    var palms = [];

    for(var i = 0; i < nPalms1; i++)
        palms.push({
            type: 1,
            position: new Vector(Math.randomMinMax(150, window.innerWidth - 150), Math.randomMinMax(150, window.innerHeight - 150))
        });

    for(var i = 0; i < nPalms2; i++)
        palms.push({
            type: 2,
            position: new Vector(Math.randomMinMax(150, window.innerWidth - 150), Math.randomMinMax(150, window.innerHeight - 150))
        });

    return palms;
}

SandWorld.prototype.createTeam = function(configTeam) {
	var totalSeekers = configTeam.seekers;
	var totalWorkers = configTeam.workers;
	var colour = configTeam.colour;
	var teamBoids = [];
	var castle = new Castle({ position: configTeam.positionCastle });

	for(var i = 0; i < totalWorkers; i++) {
		var worker = new Boid({
        	world: this,
        	geoData: {
           		position: configTeam.positionWorkers,
            	velocity: new Vector(1, 1),
            	acceleration: new Vector(0, 0)
        	},
        	behaviour: ["transport"],
        	sizeBody: 6,
        	colour: colour
    	})

    	worker.setBrain(new WorkerBrain({
        	body: worker,
        	vision:  60,
        	geoData: worker.geoData,
        	behaviour: worker.behaviour,
        	teamBoids: teamBoids,
        	castle: castle
    	}));

    	teamBoids.push(worker);
    	this.newBoid(worker)
	}

	for(var i = 0; i < totalSeekers; i++) {
		var seeker = new Boid({
        	world: this,
        	geoData: {
           		position: configTeam.positionSeekers,//Math.randomMinMax(0, 200), Math.randomMinMax(110, 200)),
            	velocity: new Vector(20, 20),
            	acceleration: new Vector(0, 0)
        	},
        	behaviour: ["searchObjective"],
        	sizeBody: 4,
        	colour: colour
    	})

    	seeker.setBrain(new SeekerBrain({
        	body: seeker,
        	vision:  60,
        	geoData: seeker.geoData,
        	behaviour: seeker.behaviour,
        	teamBoids: teamBoids,
        	castle: castle
    	}));

    	teamBoids.push(seeker);
    	this.newBoid(seeker)
	}

	this.teams.push({
		boids: teamBoids, castle: castle
	});
}

SandWorld.prototype.draw = function () {
    if(this.showPanelBenchmark)
        this.updatePanelBenchmark();
    this.clearCanvas();

    // Pintar las palmeras
    for(var i = 0; i < this.palms.length; i++)
        if(this.palms[i].type == 1)
            this.ctx.drawImage(this.imgPalm1, this.palms[i].position.getX(), this.palms[i].position.getY());
        else if(this.palms[i].type == 2)
            this.ctx.drawImage(this.imgPalm2, this.palms[i].position.getX(), this.palms[i].position.getY());

    // Pintamos la comida
    for(var i = 0; i < this.listFood.length; i++)
        this.ctx.drawImage(this.listFood[i].getImg(), this.listFood[i].position.getX() - 12, this.listFood[i].position.getY() - 12);

    for(var i = 0; i < this.teams.length; i++)
    	this.ctx.drawImage(this.teams[i].castle.getImg(), this.teams[i].castle.getPosition().getX() - 32, this.teams[i].castle.getPosition().getY() - 32);
};


SandWorld.prototype.getListFood = function() {
	return this.listFood;
}

SandWorld.prototype.eraseFood = function(id) {
	this.listFood.splice(id, 1);
}