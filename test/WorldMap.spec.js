const { it } = require('mocha');
const { expect } = require('chai');
const assert = require('assert');
const cloneDeep = require('lodash/cloneDeep');
const Game = require('../lib/Game');
const WorldMap = require('../lib/WorldMap');
const City = require('../lib/City');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;
const mediumMapFile = `${constants.rootDir}/world_map_medium.txt`;
const largeMapFileWithDuplicates = `${constants.rootDir}/world_map_large_with_duplicates.txt`;


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

        const expectedMap = new Map();
        expectedMap.set(node.cityName, city);

        let error = null;
        try {
            assert.deepStrictEqual(worldMap.map, expectedMap, "maps are equal")
        } catch (err) {
            error = err;
        }

        expect(error).to.equal(null);
    });

    // TODO: find a way around of not passing a testing conditional into initialiseWorld()
    // without this boolean, maps with destroyed cities will fail this test
    it('has a city for every line of the read in the small file', function() {
        const game = new Game(100);
        game.initialiseWorld(smallMapFile, true, false).then((res) => {
            expect(res.map.size).to.equal(28);
        });
    });

    // TODO: find a way around of not passing a testing conditional into initialiseWorld()
    // without this boolean, maps with destroyed cities will fail this test
    it('has a city for every line of the read in the medium file', function(done) {
        const game = new Game(100);
        game.initialiseWorld(mediumMapFile, true, false).then((res) => {
            expect(res.map.size).to.equal(6763);
            done();
        });
    });

    it('limits the number of monsters initialised in each city to 1', function(done) {
        const game = new Game(100);
        game.initialiseWorld(smallMapFile, false, false).then((res) => {
            const monstersInEachCity = [];
            res.map.forEach(city => {
                monstersInEachCity.push(city.occupiers.length);
            });

            const maxOneMonster = monstersInEachCity.every(count => count < 2);

            expect(maxOneMonster).to.equal(true);
            done();
        });
    });

    it('can calculate the remaining number of monsters (100 monsters injected into 28 cities)', function(done) {
        const game = new Game(100);
        game.initialiseWorld(smallMapFile, false, false).then((res) => {
            const remainers = res.calculateRemainingMonsters();
            expect(remainers).to.equal(28);
            done();
        });
    });

    it('can calculate the remaining number of monsters (120 monsters injected into 28 cities)', function(done) {
        const game = new Game(120);
        game.initialiseWorld(smallMapFile, false, false).then((res) => {
            const remainers = res.calculateRemainingMonsters();
            expect(remainers).to.equal(28);
            done();
        });
    });

    it('can calculate the remaining number of monsters (1000 monsters injected into 6763 cities)', function(done) {
        const game = new Game(1000);
        game.initialiseWorld(mediumMapFile, false, false).then((res) => {
            const remainers = res.calculateRemainingMonsters();
            expect(remainers).to.equal(1000);
            done();
        });
    });

});
