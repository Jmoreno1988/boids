window.onload = function() {

    var world = new World({
        idWorld: "world"
    });

    var nBoids = 20;
    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
        world: world,
        geoData: {
            position: new Vector(world.random(0, 300), world.random(0, 200)),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        },
        behaviour: ["separation"]
    }));

    world.run();
};