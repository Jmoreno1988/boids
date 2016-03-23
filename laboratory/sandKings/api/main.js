window.onload = function() {

    var world = new SandWorld({
        idWorld: "world",
        showPanelBenchmark: true,
        food: 10
    });

    world.newHiveMind(new HiveMind({
        world: world,
        seekers: 2,
        colour: "#FE2E2E",
        positionCastle: new Vector(60, 60)
    }));

    world.newHiveMind(new HiveMind({
        world: world,
        seekers: 1,
        colour: "#4A91FF",
        positionCastle: new Vector(window.innerWidth - 60, window.innerHeight - 100)
    }));

    world.run();
};

function l() { // log
    for (var i = 0; i < arguments.length; i++)
        console.log(arguments[i]);
}