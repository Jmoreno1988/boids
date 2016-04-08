# Boids
#### A distributed behavioral model

Boids is an artificial life computer model, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds.
More info: 
 - Reynolds page: http://www.red3d.com/cwr/boids/
 - Wikipedia: https://en.wikipedia.org/wiki/Boids

### Examples
 - Flocking: http://46.101.187.32/boids/

### Installation
```sh
$ git clone https://github.com/Jmoreno1988/boids.git
```

### Usage
```sh
    var world = new World({
        idWorld: "idCanvasHTML",
        width: 400,
        height: 400
    });
    
    var nBoids = 150;
    for (var i = 0; i < nBoids; i++)
        world.newBoid(new Boid({
            world: world,
            geoData: {
                position: new Vector(100, 100),
                velocity: new Vector(10, 10),
                acceleration: new Vector(0, 0)
        },
        behavior: ["separation", "alignment", "cohesion"],
        sizeBody: 12
    }));

    world.run();
```

### Version
0.5.2

### Development
Want to contribute? Great!... Fork, fork, fork!! ;)

### License
GNU GENERAL PUBLIC LICENSE v3

Copyright (C) 2016 JMoreno Games.
