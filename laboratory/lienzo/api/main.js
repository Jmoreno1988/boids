window.onload = function() {

    var world = new World({
        idWorld: "world"
    });

    var nBoids = 10;
    for (var i = 0; i < nBoids; i++)
        world.newBoid();

    world.run();
};