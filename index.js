const Game = require('./lib/Game');

// Initialise Game Process
const gameInstance = new Game(50);
const { executeClockCycleMove, worldMap } = gameInstance.initialiseWorld()
    .then(res => {
        let worldMap = res.executeClockCycleMove(res.worldMap);
        let scannedWorldMap = worldMap.destroyOverOccupiedCities()
        console.log(scannedWorldMap);
    });



