const { it } = require('mocha');
const { expect } = require('chai');
const cloneDeep = require('lodash/cloneDeep');
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
            const firstExpectedCity = constructedMap.get(firstExpectedCityName);

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
            const firstExpectedCity = constructedMap.get(firstExpectedCityName);
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

    xit('is aware if a monster is occupying it', function() {
        expect.fail();
    });

    xit('is destroyed if two monsters are occupying it', function() {
        expect.fail();
    });

});
