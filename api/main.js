window.onload = function() {

    var world = new World({
        idWorld: "world",
        width: window.innerWidth,
        height: window.innerHeight,
        showPanelBenchmark: true
    });

    var nBoids = 60;
    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
        world: world,
        geoData: {
            position: new Vector(Math.randomMinMax(0, world.getworldWidth()), Math.randomMinMax(0, world.getworldHeight())),
            velocity: new Vector(Math.randomMinMax(-10, 10), Math.randomMinMax(-10, 10)),
            acceleration: new Vector(0, 0)
        },
        behavior: ["separation", "alignment", "cohesion"],
        sizeBody: 12,
        urlImg: "api/img/arrow.png"
    }));

    world.run();
};