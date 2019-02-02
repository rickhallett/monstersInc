const { expect } = require('chai');
const assert = require('assert');
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

    it('parseFileLines() seperates line into array', function() {
        const fileStringArray = ['Ege north=Dodala south=Eludisnismu east=Enolmu west=Amasna'];
        const actualArray = worldMap.parseFileLines(fileStringArray);
        const expectedArray = [[ 'Ege', 'north=Dodala', 'south=Eludisnismu', 'east=Enolmu', 'west=Amasna' ]];

        let error = null;
        try{
            assert.deepStrictEqual(actualArray, expectedArray, "arrays equal");
        } catch(err) {
            error = err;
        }

        expect(error).to.be.null;

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
