Circle.prototype.constructor = Circle;

function Circle(center, radius) {
	this.center = center;
	this.radius = radius;
}

Circle.prototype.draw = function(ctx) {
	ctx.fillStyle = "tomato";
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