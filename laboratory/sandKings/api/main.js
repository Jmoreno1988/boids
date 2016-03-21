window.onload = function() {

    var world = new SandWorld({
        idWorld: "world",
        showPanelBenchmark: true
    });

    var redTeam = world.createTeam({
        seekers: 1,
        workers: 2,
        //warriors: 10,
        colour: "red",
        positionCastle: new Vector(150, 150),
        positionWorkers: new Vector(200, 200),
        positionSeekers: new Vector(250, 250)
    })

    var redTeam = world.createTeam({
        seekers: 1,
        workers: 2,
        //warriors: 10,
        colour: "blue",
        positionCastle: new Vector(window.innerWidth - 150, window.innerHeight - 150),
        positionWorkers: new Vector(window.innerWidth - 200, window.innerHeight - 200),
        positionSeekers: new Vector(window.innerWidth - 250, window.innerHeight - 250)
    })

    world.run();
};