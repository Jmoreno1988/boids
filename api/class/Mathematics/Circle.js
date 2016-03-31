Circle.prototype.constructor = Circle;

function Circle(config) {
	this.center = config.center || new Vector(0, 0) ;
	this.radius = config.radius || 25;
    this.colour = config.colour || "tomato";
}

Circle.prototype.draw = function(ctx) {
	ctx.fillStyle = this.colour;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(this.center.getX(), this.center.getY(), this.radius - 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.center.getX(), this.center.getY(), this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
}


/***** Getters & Setters *****/
Circle.prototype.getCenter = function () {
	return this.center;
}

Circle.prototype.getRadius = function () {
	return this.radius;
}