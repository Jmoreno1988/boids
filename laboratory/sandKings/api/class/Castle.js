Castle.prototype.constructor = Castle

function Castle(config) {
	this.position = config.position;
	this.imgCastle = new Image();
    this.imgCastle.src = "api/img/castle2.png";
    this.size = 100;
}

Castle.prototype.getImg = function() {
	return this.imgCastle;
}

Castle.prototype.getPosition = function() {
	return this.position;
}

Castle.prototype.draw = function(ctx) {
	//ctx.drawImage(this.imgCastle, this.position.getX() - 32, this.position.getY() - 32);
	//ctx.fillRect(this.position.getX() - (this.size / 2), this.position.getY() - (this.size / 2), this.size, this.size);

	var sides = 10;
	var theta = 0;
	var r = 50;
	var initX = this.position.getX();
	var initY = this.position.getY();
	ctx.beginPath();
    ctx.moveTo(initX , initY);
	for(var i = 0; i <= sides; i++){
    	ctx.lineTo( (r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY));
    	theta += 0.628319;
    }
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(initX , initY);
	for(var i = 0; i <= sides; i++){
		if(i == 0)
			ctx.moveTo((r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY));
    	ctx.lineTo( (r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY));
    	theta += 0.628319;
    }
    ctx.stroke();

    r += 5
    ctx.beginPath();
    //ctx.moveTo(initX , initY);
	for(var i = 0; i <= sides; i++){
		if(i == 0)
			ctx.moveTo((r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY));
    	ctx.lineTo( (r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY));
    	theta += 0.628319;
    }
    ctx.stroke();

		//positions.push(new Vector((r * Math.cos(theta)) + initX, (r * Math.sin(theta) + initY)));
}

