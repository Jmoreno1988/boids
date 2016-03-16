Fixed.prototype = new Boid
Fixed.prototype.constructor = Fixed
Fixed.prototype.super = Boid

function Fixed(config) {
	Boid.call(this, config);
}

Fixed.prototype.draw = function() {
	var ctx = this.myWorld.getCtx();

	// Cuerpo interior
    ctx.fillStyle = this.colour;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.geoData.position.getX(), this.geoData.position.getY(), this.sizeBody, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

Fixed.prototype.run = function() {
	this.draw();
}