const FileReader = require('../lib/FileProcessor');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const Monster = require('../lib/Monster');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;

class Game {
    constructor(FileReader, WorldMap, City, Monster) {
        this.fileProcessor = new FileReader(smallMapFile);
        this.worldMap = new WorldMap();
        this.city = new City();
        this.monster = new Monster();
    }
}

module.exports = Game;
