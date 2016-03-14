window.onload = function() {

    var world = new World({
        idWorld: "world"
    });

    var nBoids = 60;
    for (var i = 0; i < nBoids; i++)
        world.newBoid();

    world.run();
};