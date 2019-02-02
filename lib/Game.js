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
        this.fileProcessor = new FileProcessor(smallMapFile);
        this.worldMap = new WorldMap();
        this.city = new City();
        this.monster = new Monster();
    }

    initialiseWorld() {
        this.fileProcessor.init()
            .then(() => {
                this.worldMap.parseFileLines(
                    this.fileProcessor.getFileLines()
                );

            })
    }
}

module.exports = Game;

