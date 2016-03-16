window.onload = function() {

    var world = new World({
        idWorld: "world",
        showPanelBenchmark: true
    });


    var nBoids = 20;
    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
        world: world,
        geoData: {
            position: new Vector(world.random(0, 400), world.random(0, 400)),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        },
        behaviour: ["separation"],
        sizeBody: 12
    }));


    var nFixed = 1;
    for (var i = 0; i < nFixed; i++)
        world.newFixed(new Fixed({
        world: world,
        geoData: {
            position: new Vector(window.innerWidth / 2, window.innerHeight / 2)
        },
        sizeBody: 50
    }));

   world.run();
};