const { expect } = require('chai');
const assert = require('assert');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');

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

    it('connects to the City class via dependency injection', function() {
       expect(worldMap.City).to.equal(City);
    });

    it('parseFileLines() seperates line into array', function() {
        const fileStringArray = ['Ege north=Dodala south=Eludisnismu east=Enolmu west=Amasna'];
        const actualArray = worldMap.parseFileLines(fileStringArray);
        const expectedArray = [[ 'Ege', 'north=Dodala', 'south=Eludisnismu', 'east=Enolmu', 'west=Amasna' ]];

        let error = null;
        try {
            assert.deepStrictEqual(actualArray, expectedArray, "arrays equal");
        } catch(err) {
            error = err;
        }

        expect(error).to.equal(null);

    });

    it('can create a JavaScript object representing the file', function() {
        const fileStringArray = ['Ege north=Dodala south=Eludisnismu east=Enolmu west=Amasna'];
        worldMap.constructMap(fileStringArray);

        const node = {
            cityName: 'Ege',
            cityLinks: {
                north: 'Dodala',
                south: 'Eludisnismu',
                east: 'Enolmu',
                west: 'Amasna',
            },
            occupiers: [],
        };

        const city = new City(node);

        const expectedMap = new Set();
        expectedMap.add(city);

        let error = null;
        try {
            assert.deepStrictEqual(worldMap.map, expectedMap, "maps are equal")
        } catch (err) {
            error = err;
        }

        expect(error).to.equal(null);
    });

    xit('has a city for every line of the read in file', function() {
        expect.fail();
    });

    xit('can calculate the remaining number of monsters', function() {
        expect.fail();
    });

});
