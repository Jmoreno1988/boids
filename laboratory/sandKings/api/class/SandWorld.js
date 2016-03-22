SandWorld.prototype = new World
SandWorld.prototype.constructor = SandWorld
SandWorld.prototype.super = World

function SandWorld(config) {
	World.call(this, config)

	this.listFood = this.generateFood(config.food);
	this.palms = this.generatePalms(10, 5);
    this.listHiveMinds = [];
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

SandWorld.prototype.newHiveMind = function (newHiveMind) {
    this.listHiveMinds.push(newHiveMind);
}

SandWorld.prototype.draw = function () {
    if(this.showPanelBenchmark)
        this.updatePanelBenchmark();
    this.clearCanvas();
/*
    // Pintar las palmeras
    for(var i = 0; i < this.palms.length; i++)
        if(this.palms[i].type == 1)
            this.ctx.drawImage(this.imgPalm1, this.palms[i].position.getX(), this.palms[i].position.getY());
        else if(this.palms[i].type == 2)
            this.ctx.drawImage(this.imgPalm2, this.palms[i].position.getX(), this.palms[i].position.getY());
*/
    // Comida
    for(var i = 0; i < this.listFood.length; i++)
        this.ctx.drawImage(this.listFood[i].getImg(), this.listFood[i].position.getX() - 12, this.listFood[i].position.getY() - 12);
};

SandWorld.prototype.run = function() {
    this.updateTime();
    
    this.draw();

    for (var i = 0; i < this.listHiveMinds.length; i++)
        this.listHiveMinds[i].run();
    
    requestAnimationFrame(function () {
        return this.run();
    }.bind(this));
}

SandWorld.prototype.getListFood = function() {
	return this.listFood;
}

SandWorld.prototype.eraseFood = function(id) {
	this.listFood.splice(id, 1);
}