window.onload = function() {
    var imgs = ["arrowAmber", "arrowBlue", "arrowBrown", "arrowDeepPurple", "arrowGreen", "arrowGrey", "arrowIndigo", "arrowLime", "arrowOrange", "arrowPink", "arrowPurple", "arrowRed", "arrowTeal", "arrowYellow"];
    
    var world = new World({
        idWorld: "world",
        width: window.innerWidth,
        height: window.innerHeight,
        showPanelBenchmark: true
    });

    var nBoids = 200;
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
        urlImg: "api/img/" + imgs[Math.randomMinMax(0, 13)] + ".png"
    }));

    world.run();
};