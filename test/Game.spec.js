const { expect, assert } = require('chai');
const FileProcessor = require('../lib/FileProcessor');
const Game = require('../lib/Game');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const Monster = require('../lib/Monster');
const { smallWorldMapString, rootDir } = require('../constants');
const smallWorldMapFile = `${rootDir}/world_map_small.txt`;

describe('Game', function() {

    let game;

    beforeEach(function() {
       game = new Game(FileProcessor, WorldMap, City, Monster);
    });

    describe('dependency injection', function() {
        it('connects to the FileReader class through dependency injection', function() {
            expect(game.fileProcessor).to.be.an.instanceOf(FileProcessor);
        });

        it('connects to the WorldMap class through dependency injection', function() {
            expect(game.worldMap).to.be.an.instanceOf(WorldMap);
        });

        it('connects to the City class through dependency injection', function() {
            expect(game.city).to.be.an.instanceOf(City);
        });

        it('connects to the Monster class through dependency injection', function() {
            expect(game.monster).to.be.an.instanceOf(Monster);
        });
    });

    xit('can read in a command line argument and store this', function() {
        expect.fail();
    });

    xit('directs the game in ticks (turns)', function() {
        expect.fail();
    });

    xit('can generate N monsters', function() {
        expect.fail();
    });

    xit('places monsters randomly on the world map', function() {
        expect.fail();
    });

    xit('terminates if all the monsters have been destroyed', function() {
        expect.fail();
    });

    xit('terminates if each remaining monster has moved 10,000 times', function() {
        expect.fail();
    });

});
