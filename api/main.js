window.onload = function() {
    var imgs = [
        "arrowBallAmber", "arrowBallBlue", "arrowBallBrown", "arrowBallDeepPurple",
        "arrowBallGreen", "arrowBallGrey", "arrowBallIndigo", "arrowBallLime",
        "arrowBallOrange", "arrowBallPink", "arrowBallPurple", "arrowBallRed", 
        "arrowBallTeal", "arrowBallYellow"
    ]
    /*[
        "arrowAmber", "arrowBlue", "arrowBrown", "arrowDeepPurple", "arrowGreen", "arrowGrey", 
        "arrowIndigo", "arrowLime", "arrowOrange", "arrowPink", "arrowPurple", "arrowRed", 
        "arrowTeal", "arrowYellow"
    ];*/
    

    /**************/
    /** Flocking **/
    /**************/

    var world = new World({
        idWorld: "world",
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
        showPanelBenchmark: false
    });

    var nBoids = 150;
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
        urlImg: "api/img/" + imgs[Math.randomMinMax(0, imgs.length - 1)] + ".png"
    }));

    world.run();



    /**************/
    /**  Wander  **/
    /**************/

    var worldWander = new World({
        idWorld: "worldWander",
        width: 400,
        height: 400,
    });

    var wanderBoids = 5;
    for (var i = 0; i < wanderBoids; i++)
        worldWander.newBoid(new Boid({
        world: worldWander,
        geoData: {
            position: new Vector(Math.randomMinMax(0, worldWander.getworldWidth()), Math.randomMinMax(0, worldWander.getworldHeight())),
            velocity: new Vector(Math.randomMinMax(-10, 10), Math.randomMinMax(-10, 10)),
            acceleration: new Vector(0, 0)
        },
        behavior: ["wander", "separation"],
        sizeBody: 12,
        urlImg: "api/img/arrowGreen.png",
        drawForce: false
    }));

    worldWander.run();



    /********************/
    /** Path Following **/
    /********************/

    var worldPath = new World({
        idWorld: "worldPath",
        width: 400,
        height: 400,
    });

    var path = new Path({
        nodes: [
            new Vector(60, 40),
            new Vector(200, 80),
            new Vector(340, 40),
            new Vector(300, 200),
            new Vector(340, 340),
            new Vector(200, 300),
            new Vector(60, 340),
        ],
        radius: 25
    })

    var followingBoids = 1;
    for (var i = 0; i < followingBoids; i++) {
        var b = new Boid({
            world: worldPath,
            geoData: {
                position: new Vector(15, 15),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behavior: ["pathFollowing"],
            sizeBody: 12,
            urlImg: "api/img/arrowBlue.png"
        });
        b.getBrain().setPathForward(path);
        worldPath.newBoid(b);
    }
    worldPath.setListPaths([path]);
    worldPath.run();



    /************************/
    /** Obstacle Avoidance **/
    /************************/

    var worldObstacle = new World({
        idWorld: "worldObstacle",
        width: 400,
        height: 400,
    });

    var obstacles = [
        new Circle({
            center: new Vector(100, 100),
            radius: 25,
            colour: "#607D8B"
        }),
        new Circle({
            center: new Vector(300, 100),
            radius: 25,
            colour: "#607D8B"
        }),
        new Circle({
            center: new Vector(100, 300),
            radius: 25,
            colour: "#607D8B"
        }),
        new Circle({
            center: new Vector(300, 300),
            radius: 25,
            colour: "#607D8B"
        }),
        new Circle({
            center: new Vector(200, 200),
            radius: 25,
            colour: "#607D8B"
        }) ]

    var obstacleBoids = 5;
    for (var i = 0; i < obstacleBoids; i++) {
        var b = new Boid({
            world: worldObstacle,
            geoData: {
                position: new Vector(15, 15),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["obstacleAvoidance", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowOrange.png"
        });

        worldObstacle.newBoid(b);
    }

    worldObstacle.setListObstacles(obstacles);
    worldObstacle.run();



    /**************/
    /**   Seek   **/
    /**************/

    var worldSeek = new World({
        idWorld: "worldSeek",
        width: 400,
        height: 400,
    });

    var a = new Boid({
            world: worldSeek,
            geoData: {
                position: new Vector(15, 15),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["wander", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowBlue.png"
        });
    worldSeek.newBoid(a);
    var seekBoids = 10;
    for (var i = 0; i < seekBoids; i++) {
        var b = new Boid({
            world: worldSeek,
            geoData: {
                position: new Vector(150, 150),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["seek", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowRed.png"
        });

        b.getBrain().setObjective(a);
        worldSeek.newBoid(b);
    }

    worldSeek.run();



    /**************/
    /**   Flee   **/
    /**************/

    var worldFlee = new World({
        idWorld: "worldFlee",
        width: 400,
        height: 400,
    });

    var a = new Boid({
            world: worldFlee,
            geoData: {
                position: new Vector(15, 15),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["wander", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowBlue.png"
        });
    worldFlee.newBoid(a);
    var fleeBoids = 10;
    for (var i = 0; i < fleeBoids; i++) {
        var b = new Boid({
            world: worldFlee,
            geoData: {
                position: new Vector(150, 150),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["flee", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowRed.png"
        });

        b.getBrain().setObjective(a);
        worldFlee.newBoid(b);
    }

    worldFlee.run();



    /**************/
    /**  Pursue  **/
    /**************/

    var worldEvadePursue = new World({
        idWorld: "worldEvadePursue",
        width: 400,
        height: 400,
    });

    var a = new Boid({
            world: worldEvadePursue,
            geoData: {
                position: new Vector(15, 15),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["wander", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowBlue.png"
        });
    worldEvadePursue.newBoid(a);
    var fleeBoids = 1;
    for (var i = 0; i < fleeBoids; i++) {
        var b = new Boid({
            world: worldEvadePursue,
            geoData: {
                position: new Vector(150, 150),
                velocity: new Vector(10, 5),
                acceleration: new Vector(0, 0)
            },
            behavior: ["pursue", "separation"],
            sizeBody: 12,
            urlImg: "api/img/arrowRed.png"
        });

        b.getBrain().setObjective(a);
        worldEvadePursue.newBoid(b);
    }

    worldEvadePursue.run();
};