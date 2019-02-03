const FileProcessor = require('../lib/FileProcessor');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const Monster = require('../lib/Monster');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;

class Game {
    constructor(initialMonsters) {
        this.state = { initialMonsters: initialMonsters };
        this.injectDependencies();
        // this.initialiseWorld();
    }

    injectDependencies() {
        this.FileProcessor = FileProcessor;
        this.WorldMap = WorldMap;
        this.City = City;
        this.Monster = Monster;
    }

    generateMonsters() {
        const monsters = [];
        for (let i = 0; i < this.state.initialMonsters; i++) {
            monsters.push(new this.Monster());
        }

        return monsters;
    }

    injectMonstersIntoMap(monsters, worldMap) {
        worldMap.consumeMonsters(monsters);
    }

    initialiseWorld(map = smallMapFile, testingIntact = false, proceedToClockCycle = true) {
        const fileProcessor = new this.FileProcessor(map);
        const worldMap = new this.WorldMap();

        return fileProcessor.init()
            .then(() => {
                worldMap.constructMap(fileProcessor.getFileLines());

                // TODO: eliminate this boolean dependency to allow testing different responses from worldMap
                if (testingIntact && !proceedToClockCycle) {
                    return worldMap;
                }

                this.injectMonstersIntoMap(this.generateMonsters(), worldMap);

                // TODO: eliminate this boolean dependency to allow testing different responses from worldMap
                if (!testingIntact && !proceedToClockCycle){
                    return worldMap;
                }

                // TODO: find a way to chain the major game functions asynchronously for cleaner code and ability to decouple testing functions
                // const clockCyclePromise = new Promise((resolve, reject) => {
                //
                // });

                if(!testingIntact && proceedToClockCycle) {
                    return { initialiseClockCycle: this.initialiseClockCycle, worldMap: worldMap }
                }

            });
    }

    initialiseClockCycle(worldMap) {
        return worldMap.allMonstersMove();
    }
}

module.exports = Game;

