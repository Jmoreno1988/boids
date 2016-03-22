Castle.prototype.constructor = Castle

function Castle(config) {
	this.position = config.position;
	this.imgCastle = new Image();
    this.imgCastle.src = "api/img/castle2.png";
}

Castle.prototype.getImg = function() {
	return this.imgCastle;
}

Castle.prototype.getPosition = function() {
	return this.position;
}

Castle.prototype.draw = function(ctx) {
	ctx.drawImage(this.imgCastle, this.position.getX() - 32, this.position.getY() - 32);
}

