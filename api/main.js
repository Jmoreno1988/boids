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
            position: new Vector(Math.randomMinMax(0, 400), Math.randomMinMax(0, 400)),
            velocity: new Vector(0, 0),
            acceleration: new Vector(0, 0)
        },
        behaviour: ["separation", "wander"],
        sizeBody: 12
    }));

    world.run();
};