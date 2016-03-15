window.onload = function() {

    var world = new World({
        idWorld: "world"
    });

    var nBoids = 20;
    var x = 10;
    var y = 10;
    for (var i = 0; i < nBoids; i++){
            world.newBoid(new Boid({
            world: world,
            geoData: {
                position: new Vector(x, y),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behaviour: ["separation"],
            objetive: new Vector(600, 600),
            colour: "red"
        }));
         
        x += 25;
        if(i % 5  == 0 && i != 0){
            x = 10;
            y += 25;
        }
    }


var nBoids = 20;
    var x = 470;
    var y = 560;
    for (var i = 0; i < nBoids; i++){
            world.newBoid(new Boid({
            world: world,
            geoData: {
                position: new Vector(x, y),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behaviour: ["separation"],
            objetive: new Vector(0, 0),
            colour: "blue"
        }));
         
        x += 25;
        if(i % 5  == 0 && i != 0){
            x = 470;
            y -= 25;
        }
    }


    var nBoids = 20;
    var x = 470;
    var y = 10;
    for (var i = 0; i < nBoids; i++){
            world.newBoid(new Boid({
            world: world,
            geoData: {
                position: new Vector(x, y),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behaviour: ["separation"],
            objetive: new Vector(0, 600),
            colour: "green"
        }));
         
        x += 25;
        if(i % 5  == 0 && i != 0){
            x = 470;
            y += 25;
        }
    }


    var nBoids = 20;
    var x = 10;
    var y = 560;
    for (var i = 0; i < nBoids; i++){
            world.newBoid(new Boid({
            world: world,
            geoData: {
                position: new Vector(x, y),
                velocity: new Vector(0, 0),
                acceleration: new Vector(0, 0)
            },
            behaviour: ["separation"],
            objetive: new Vector(600, 0),
            colour: "Orchid"
        }));
         
        x += 25;
        if(i % 5  == 0 && i != 0){
            x = 10;
            y -= 25;
        }
    }

   world.run();
};