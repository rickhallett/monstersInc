const FileProcessor = require('../lib/FileProcessor');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const Monster = require('../lib/Monster');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;

class Game {
    constructor() {
        this.state = {};
        this.injectDependencies();
        this.initialiseWorld();
    }

    injectDependencies() {
        this.FileProcessor = FileProcessor;
        this.WorldMap = WorldMap;
        this.City = City;
        this.Monster = Monster;
    }

    initialiseWorld() {
        const fileProcessor = new this.FileProcessor(smallMapFile);
        const worldMap = new this.WorldMap();

        fileProcessor.init()
            .then(() => {
                worldMap.constructMap(
                    fileProcessor.getFileLines()
                );

                worldMap.map;
            })
    }
}

module.exports = Game;

