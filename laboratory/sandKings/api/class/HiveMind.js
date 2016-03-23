HiveMind.prototype.constructor = HiveMind;

function HiveMind (config) {
	this.world = config.world;
	this.castle = new Castle({ position: config.positionCastle })
	this.colour = config.colour;
	this.listBoids = [];
	this.seekers = this.createSeekers(config.seekers);
	this.workers = [];
	this.warriors = [];
	this.groupWorkers = [];

	this.countTime = 0;
	this.hungry = 100;
	this.life = 100;
	this.population = 30;
	this.maxPopulation = 250;
}

HiveMind.prototype.run = function() {
	this.updateHungry();

	for (var i = 0; i < this.listBoids.length; i++)
        this.listBoids[i].run();

	// Comprobar si los seekers han visto algo
	for (var i = 0; i < this.seekers.length; i++) {
		this.seekers[i].getBrain().searchObjectiveBehavior();

		// Si han visto algo estan esperando a que lleguen los workers a recogerlo
		if(this.seekers[i].getBrain().getActualState() == "pendingWorkers") {
			// Pedir workers
			this.createGroupWorkers(10, this.seekers[i].getBrain().getActualObject(), this.seekers[i]);
			// Pasar a waiting
			this.seekers[i].getBrain().setActualState("waiting");
		}	
	}

	for(var i = 0; i < this.groupWorkers.length; i++) {
		// calculamos el vector medio 
		var x = 0;
		var y = 0;
		for(var a = 0; a < this.groupWorkers[i].workers.length; a++) {
			//this.workers[i].getBrain().transportBehavior();
			x += this.groupWorkers[i].workers[a].getPosition().getX();
			y += this.groupWorkers[i].workers[a].getPosition().getY();
		}

		this.groupWorkers[i].middleVector = new Vector(x / this.groupWorkers[i].workers.length, y / this.groupWorkers[i].workers.length);
		// comprobamos si ha atrapdo el objeto
		if(!this.groupWorkers[i].isCollected && this.groupWorkers[i].middleVector.module(this.groupWorkers[i].objective.getPosition()) < 10) {
			this.groupWorkers[i].isCollected = true;
			this.groupWorkers[i].objective.setIsTouch(true);
			// cambiamos el objetivo de los workers 
			for(var a = 0; a < this.groupWorkers[i].workers.length; a++) 
				this.groupWorkers[i].workers[a].getBrain().setObjective(this.castle.getPosition());
		}
		
		// movemos el objeto
		if(this.groupWorkers[i].isCollected)
			this.groupWorkers[i].objective.setPosition(this.groupWorkers[i].middleVector)

		// Liberamos al seeker
		if(this.groupWorkers[i].seeker != null && this.groupWorkers[i].isCollected){
			this.groupWorkers[i].seeker.getBrain().setActualState("newSearch");
			this.groupWorkers[i].seeker = null
		}


		// Borramos  el groupWorkers
		if(this.groupWorkers[i].isCollected && this.groupWorkers[i].middleVector.module(this.groupWorkers[i].workers[0].getBrain().getObjective()) < 10) {
			for(var e = 0; e < this.groupWorkers[i].workers.length; e++)
				this.groupWorkers[i].workers[e].getBrain().dead();
			this.groupWorkers.splice(i,1);
		}
		
	}
		// Pintar castillo
		this.castle.draw(this.world.getCtx());

		// Pintar info
		this.drawInfoHiveMind(this.world.getCtx());
}

HiveMind.prototype.updateHungry = function () {
	this.countTime += this.world.getDeltaT();
	
	if(this.countTime > 1 && this.hungry > 0) {
		this.hungry -= 1;
		this.countTime = 0;
	}
}


HiveMind.prototype.createGroupWorkers = function(n, objective, seeker) {
	var positions = this.generatePositions(this.castle.getPosition(), n)
	var aux = [];
	for(var i = 0; i < n; i++){
	var worker = new Boid({
			id: this.world.listBoids.length,
        	world: this.world,
        	geoData: {
           		position: positions[i],
            	velocity: new Vector(1, 1),
            	acceleration: new Vector(0, 0)
        	},
        	physicLimits: {
      	  		velocityMax: 20,
        		accelerationMax: 30
    		},
        	behaviour: [],
        	sizeBody: 6,
        	colour: this.colour
    	})

	worker.setBrain(new WorkerBrain({
        	body: worker,
        	hiveMind: this,
        	vision:  60,
        	geoData: worker.geoData,
        	behaviour: worker.behaviour,
        	objectiveFood: objective
    	}));

	worker.getBrain().setObjective(objective.getPosition());
	worker.getBrain().setBehavior(["seek", "separation", "cohesion"]);
	worker.getBrain().setActualState("workingToGo");
	aux.push(worker);
	this.workers.push(worker)
	this.listBoids.push(worker)
	this.world.listBoids.push(worker);
	}
	this.groupWorkers.push({
		objective: objective,
		isCollected: false,
		workers: aux,
		middleVector: new Vector(0,0),
		seeker: seeker
	});
}

HiveMind.prototype.createSeekers = function (nSeekers) {
	var list = [];
	for (var i = 0; i < nSeekers; i++) {
		var seeker = new Boid({
            id: this.world.listBoids.length,
            world: this.world,
            geoData: {
                position: this.castle.getPosition(),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behavior: ["wander"],
            sizeBody: 4,
            colour: this.colour
        })

        seeker.setBrain(new SeekerBrain({
            body: seeker,
            vision:  60,
            geoData: seeker.geoData,
            behavior: seeker.behavior
        }));

        this.listBoids.push(seeker);
		this.world.listBoids.push(seeker);
		list.push(seeker);
	};

	return list;
}

HiveMind.prototype.generatePositions = function(initPosition, total) {
    var positions = [];
    var r = 20;
    var theta = 0;
    var initX = initPosition.getX();
    var initY = initPosition.getY();

    for(var i = 0; i < total - 1; i++){
        positions.push(new Vector((r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY)));
        theta += 16;
    }

    positions.push(initPosition);

    return positions;
}

HiveMind.prototype.drawInfoHiveMind = function (ctx) {
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";
	ctx.fillText("Hungry: " + this.hungry, this.castle.getPosition().getX() - 40, this.castle.getPosition().getY() - 10);
	ctx.fillText("Population: " + this.population, this.castle.getPosition().getX() - 40, this.castle.getPosition().getY() + 5);
	ctx.fillText("Life: " + this.life, this.castle.getPosition().getX() - 40, this.castle.getPosition().getY() + 20);
}
