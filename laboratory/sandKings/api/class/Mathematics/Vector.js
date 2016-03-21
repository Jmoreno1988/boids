Vector.prototype.constructor = Vector;

function Vector(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
}

Vector.prototype.scale = function (n) {
    return new Vector(this.coordX * n, this.coordY * n);
};

Vector.prototype.add = function (vector) {
    return new Vector(this.coordX + vector.getX(), this.coordY + vector.getY());
};

Vector.prototype.sub = function (vector) {
    return new Vector(this.coordX - vector.getX(), this.coordY - vector.getY());
};

Vector.prototype.director = function (vector) {
    return new Vector(vector.getX() - this.coordX, vector.getY() - this.coordY);
};

Vector.prototype.unit = function () {
    return new Vector(this.coordX / this.unitaryModule(), this.coordY / this.unitaryModule());
};

Vector.prototype.module = function (param) {
    return Math.pow(Math.pow(param.coordX - this.coordX, 2) + Math.pow(param.coordY - this.coordY, 2), 0.5);
};

Vector.prototype.unitaryModule = function () {
    return Math.pow(Math.pow(this.coordX, 2) + Math.pow(this.coordY, 2), 0.5);
}


/***** Getters & Setters *****/
Vector.prototype.getX = function () {
    return this.coordX;
};

Vector.prototype.setX = function (newValue) {
    this.coordX = newValue;
};

Vector.prototype.getY = function () {
    return this.coordY;
};

Vector.prototype.setY = function (newValue) {
    this.coordY = newValue;
};