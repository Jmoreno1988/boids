window.onload = function() {
    var imgs = [
        "arrowBallAmber", "arrowBallBlue", "arrowBallBrown", "arrowBallDeepPurple",
        "arrowBallGreen", "arrowBallGrey", "arrowBallIndigo", "arrowBallLime",
        "arrowBallOrange", "arrowBallPink", "arrowBallPurple", "arrowBallRed", 
        "arrowBallTeal", "arrowBallYellow"
    ]
    
    var world = new World({
        idWorld: "world",
        width: window.innerWidth,
        height: window.innerHeight,
        showPanelBenchmark: false
    });


    var nBoids = 150;
    var wWidth = world.getworldWidth();
    var wHeight = world.getworldHeight();

    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
        world: world,
        geoData: {
            position: new Vector(Math.randomMinMax(0, wWidth), Math.randomMinMax(0, wHeight)),
            velocity: new Vector(Math.randomMinMax(-10, 10), Math.randomMinMax(-10, 10)),
            acceleration: new Vector(0, 0)
        },
        behavior: ["separation", "alignment", "cohesion"],
        sizeBody: 12,
        urlImg: "api/img/" + imgs[Math.randomMinMax(0, imgs.length - 1)] + ".png"
    }));

    world.run();
};