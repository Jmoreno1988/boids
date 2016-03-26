Segment.prototype.constructor = Segment;

function Segment(initPoint, endPoint) {
	this.initPoint = initPoint;
	this.endPoint = endPoint;
}

Segment.prototype.draw = function(ctx) {
	ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.initPoint.getX(), this.initPoint.getY());
    ctx.lineTo(this.endPoint.getX(), this.endPoint.getY());
    ctx.closePath();
    ctx.stroke();
}

Segment.prototype.intersectionCircle = function (circle) { }