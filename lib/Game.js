const FileProcessor = require('../lib/FileProcessor');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const Monster = require('../lib/Monster');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;

class Game {
    constructor() {
        this.state = { initialMonsters: 100 };
        this.injectDependencies();
        this.initialiseWorld();
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

    initialiseWorld(map = smallMapFile, testingIntact = false) {
        const fileProcessor = new this.FileProcessor(map);
        const worldMap = new this.WorldMap();

        return fileProcessor.init()
            .then(() => {
                worldMap.constructMap(fileProcessor.getFileLines());

                // TODO: eliminate this boolean depedency to allow testing different responses from worldMap
                if (testingIntact) {
                    return worldMap;
                }

                this.injectMonstersIntoMap(this.generateMonsters(), worldMap);

                if (!testingIntact){
                    return worldMap;
                }

            });
    }
}

module.exports = Game;

