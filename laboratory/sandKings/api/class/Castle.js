Castle.prototype.constructor = Castle

function Castle(config) {
	this.position = config.position;
	this.imgCastle = new Image();
    this.imgCastle.src = "api/img/castle.png";
}

Castle.prototype.getImg = function() {
	return this.imgCastle;
}

Castle.prototype.getPosition = function() {
	return this.position;
}