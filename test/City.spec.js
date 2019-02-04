const { it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const cloneDeep = require('lodash/cloneDeep');
const Game = require('../lib/Game');
const FileProcessor = require('../lib/FileProcessor');
const WorldMap = require('../lib/WorldMap');
const constants = require('../constants');
const smallMapFile = `${constants.rootDir}/world_map_small.txt`;

const firstLineOfSmallWorldMapFile = 'E north=Mu south=Aninige east=Dimilu west=Asmismu';

describe('City', function() {

    it('has an assigned name', function(done) {
        const fileProcessor = new FileProcessor(smallMapFile);
        const worldMap = new WorldMap();

        fileProcessor.init().then(res => {
            const fileLines = res;
            const constructedMap = worldMap.constructMap(fileLines);
            const firstExpectedCityName = 'E';
            const firstExpectedCity = constructedMap.map.get(firstExpectedCityName);

            expect(firstExpectedCity.cityName).to.equal('E');
            done();
        });
    });

    it('has key-value links to other cities', function(done) {
        const fileProcessor = new FileProcessor(smallMapFile);
        const worldMap = new WorldMap();

        fileProcessor.init().then(res => {
            const fileLines = res;
            const constructedMap = worldMap.constructMap(fileLines);
            const firstExpectedCityName = 'E';
            const firstExpectedCity = constructedMap.map.get(firstExpectedCityName);
            const expectedCityLinks = {
                north: 'Mu',
                south: 'Aninige',
                east: 'Dimilu',
                west: 'Asmismu'
            };

            expect(firstExpectedCity.cityLinks).to.deep.equal(expectedCityLinks);
            done();
        });
    });

    it('is aware if a monster is occupying it', function(done) {
        const initialMonsterQuantity = 100;
        const game = new Game(initialMonsterQuantity);
        const fileProcessor = new FileProcessor(smallMapFile);
        const worldMap = new WorldMap();

        fileProcessor.init().then(res => {
            const fileLines = res;
            const constructedMap = worldMap.constructMap(fileLines);

            const monsters = game.generateMonsters();
            game.injectMonstersIntoMap(monsters, constructedMap);
            // worldMap.populateMap(monsters);


            const firstExpectedCityName = 'E';
            const firstExpectedCity = constructedMap.map.get(firstExpectedCityName);
            const expectedMonsters = firstExpectedCity.occupiers;

            expect(expectedMonsters).to.be.an('array');
            done();
        });
    });

    it('is destroyed if two or more monsters are occupying it', function(done) {

        if(!console.log.restore) {
            sinon.stub(console, 'log');
        }


        const initialMonsterQuantity = 100;
        const game = new Game(initialMonsterQuantity);
        const fileProcessor = new FileProcessor(smallMapFile);
        const worldMap = new WorldMap(false);

        fileProcessor.init().then(res => {
            const fileLines = res;
            const constructedMap = worldMap.constructMap(fileLines);

            const monsters = game.generateMonsters();
            game.injectMonstersIntoMap(monsters, constructedMap);
            const firstExpectedCityName = 'E';
            const firstExpectedCity = cloneDeep(constructedMap.map.get(firstExpectedCityName));
            const initialMonstersPresent = firstExpectedCity.occupiers;

            const mapWithOneMoveCycle = cloneDeep(constructedMap.allMonstersMove());
            let anOverOccupiedCity;
            mapWithOneMoveCycle.map.forEach(city => {
                if (city.occupiers.length > 1) {
                    anOverOccupiedCity = city;
                }
            });

            const mapWithOneDestroyCycle = cloneDeep(constructedMap.destroyOverOccupiedCities());
            const whatWasAnOverOccupiedCity = mapWithOneDestroyCycle.map.get(anOverOccupiedCity.cityName);

            expect(whatWasAnOverOccupiedCity).to.equal(undefined);

            console.log.restore();
            done();
        });
    });

});
