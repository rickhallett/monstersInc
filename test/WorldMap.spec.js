const { expect } = require('chai');
const WorldMap = require('../lib/WorldMap');

describe('WorldMap', function() {

    let worldMap;

    beforeEach(function(){
        worldMap = new WorldMap();
    });

    it('exports a WorldMap constructor', function() {
        const WorldMap = require('../lib/WorldMap');
        const aNewWorldMap = new WorldMap();
        expect(aNewWorldMap).to.be.an.instanceOf(WorldMap);
    });

    xit('can create a JavaScript object representing the file', function() {
        expect.fail();
    });

    xit('has a city for every line of the read in file', function() {
        expect.fail();
    });

    xit('can calculate the remaining number of monsters', function() {
        expect.fail();
    });

});
