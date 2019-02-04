const chalk = require('chalk');
const Game = require('./lib/Game');
const mediumMapFile = './world_map_medium.txt';

// Initialise Game Process
const gameInstance = new Game(4540);
const { executeClockCycleMove, worldMap } = gameInstance.initialiseWorld(mediumMapFile)
    .then(res => {
        let worldMap = res.worldMap;

        while (worldMap.totalMovesCompleted < 10000 && !worldMap.worldDestroyed) {
            worldMap = res.executeClockCycleMove(worldMap);
            worldMap = worldMap.destroyOverOccupiedCities();
        }

        if (worldMap.totalMovesCompleted > 9999 && !worldMap.worldDestroyed) {
            console.log(chalk.red('The monsters scurried around 10,000 times, but the world remains.'));
            console.log(chalk.red.underline(`${worldMap.map.size} cities remain, in fact.`));
            console.log(chalk.red.bold('You are a poor excuse for an evil overlord :('))
        }

        if (worldMap.worldDestroyed) {
            console.log(chalk.green('The world has been destroyed! You have been invited to the Evil Overlord evil party!!'));
            console.log(chalk.green.bold('This is all you ever really wanted :)'));
        }

    });



