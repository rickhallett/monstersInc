const Game = require('./lib/Game');

// Initialise Game Process
const gameInstance = new Game(50);
const { executeClockCycleMove, worldMap } = gameInstance.initialiseWorld()
    .then(res => {
        let worldMap = res.executeClockCycleMove(res.worldMap);
        let scannedWorldMap = worldMap.destroyOverOccupiedCities();

        // this is fucking it. nearly there.
        // let worldMap = res.worldMap;
        //
        // while (worldMap.totalMovesCompleted < 10000 && !worldMap.worldDestroyed) {
        //     worldMap = res.executeClockCycleMove(worldMap);
        //     worldMap = worldMap.destroyOverOccupiedCities();
        // }


    });



