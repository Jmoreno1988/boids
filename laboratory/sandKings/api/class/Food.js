Food.prototype.constructor = Food;

function Food(config) {
	this.id = config.id;
	this.type = config.type;
	this.position = config.position;
	this.imgFood = new Image();
    this.imgFood.src = "api/img/food2.png";
    this.isTouch = false;
    this.weight = 11;
}

Food.prototype.getImg = function() {
	return this.imgFood;
}

Food.prototype.getPosition = function() {
	return this.position;
}

Food.prototype.setPosition = function(newValue) {
	this.position = newValue;
}

Food.prototype.getId = function() {
	return this.id;
}

Food.prototype.setIsTouch = function(newValue) {
	this.isTouch = newValue;
}

Food.prototype.getIsTouch = function(newValue) {
	return this.isTouch;
}