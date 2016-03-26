window.onload = function() {

    var world = new World({
        idWorld: "world",
        showPanelBenchmark: true
    });

    var nBoids = 60;
    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
        world: world,
        geoData: {
            position: new Vector(Math.randomMinMax(0, window.innerWidth), Math.randomMinMax(0, window.innerHeight)),
            velocity: new Vector(Math.randomMinMax(-10, 10), Math.randomMinMax(-10, 10)),
            acceleration: new Vector(0, 0)
        },
        behaviour: ["separation", "cohesion", "alignment"],
        sizeBody: 12
    }));

    world.run();
};