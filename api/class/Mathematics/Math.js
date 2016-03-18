// Math class extension
// TODO: buscar una mejor manera de añadir metodos estaticos en Javascript
Math.randomMinMax = function(min, max) {
	return Math.round(Math.random() * (max - min) + parseInt(min));
}

Math.integrate = function (primitive, diff, delta) {
    return primitive.add(diff.scale(delta));
};