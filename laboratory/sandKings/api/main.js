window.onload = function() {

    var world = new SandWorld({
        idWorld: "world",
        showPanelBenchmark: true,
        food: 1
    });

    var redMind = new HiveMind({
        world: world,
        seekers: 2,
        colour: "red",
        positionCastle: new Vector(60, 60)
    })

    var blueMind = new HiveMind({
        world: world,
        seekers: 2,
        colour: "blue",
        positionCastle: new Vector(window.innerWidth - 60, window.innerHeight - 100)
    })

    world.newHiveMind(redMind);
    world.newHiveMind(blueMind);

    world.run();
};

function l() { // log
    for (var i = 0; i < arguments.length; i++)
        console.log(arguments[i]);
}