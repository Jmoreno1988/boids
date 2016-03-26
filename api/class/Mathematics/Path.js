Path.prototype.constructor = Path;

function Path (config) {
	this.nodes = config.nodes || []; 
	this.radius = config.radius || 5;
}

Path.prototype.draw = function (ctx) {
	var initX = this.nodes[0].getX();
	var initY = this.nodes[0].getY();

	ctx.strokeStyle = "black";	
	ctx.beginPath();
    ctx.moveTo(initX , initY);
	for(var i = 0; i < this.nodes.length; i++)
    	ctx.lineTo(this.nodes[i].getX(), this.nodes[i].getY());
    ctx.stroke();

    ctx.strokeStyle = "red";
    for(var i = 0; i < this.nodes.length; i++){
    	ctx.beginPath();
    	ctx.arc(this.nodes[i].getX(), this.nodes[i].getY(), this.radius, 0, Math.PI * 2, true);	
    	ctx.closePath();
    	ctx.stroke();
    }
}

/***** Getters & Setters *****/
Path.prototype.getNodes = function () {
	return this.nodes;
}

Path.prototype.getNode = function (node) {
	return this.nodes[node];
}

Path.prototype.addNode = function (newNode) {
	this.nodes.push(newNode);
}

Path.prototype.setNodes = function (newNodes) {
	this.nodes = newNodes;
}

Path.prototype.getRadius = function () {
	return this.radius;
}
