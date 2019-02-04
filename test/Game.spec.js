const { it } = require('mocha');
const { expect } = require('chai');
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
       game = new Game(100);
    });

    it('can generate N monsters', function() {
        const monsters = game.generateMonsters();
        expect(monsters.length).to.equal(100);
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
