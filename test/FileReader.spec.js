const { expect } = require('chai');
const FileProcessor = require('../lib/FileProcessor');
const { smallWorldMapString, rootDir } = require('../constants');
const smallWorldMapFile = `${rootDir}/world_map_small.txt`;

describe('FileProcessor', function() {

    let fileProcessor;

    beforeEach(function(){
        fileProcessor = new FileProcessor(smallWorldMapFile);
    });

    it('exports a FileProcessor constructor', function() {
        const FileProcessor = require('../lib/FileProcessor');
        const aFileProcessorInstance = new FileProcessor(smallWorldMapFile);
        expect(aFileProcessorInstance).to.be.an.instanceOf(FileProcessor);
    });

    it('can read in a world map file', function() {
        const rawData = fileProcessor.readInFile();
        rawData.then(res => {
            expect(res).to.be.an.instanceOf(Buffer);
        });
    });

    it('converts the read file into a string that acceptable to parser', function() {
        const rawData = fileProcessor.readInFile();
        rawData.then(res => {
            const acceptableString = fileProcessor.convertBufferToString(res);
            expect(acceptableString).to.equal(smallWorldMapString);
        }).catch(err => {
            console.log(err)
        });
    });

    it('it can parse the map string into lines representing cities', function() {
        const firstCity = 'E north=Mu south=Aninige east=Dimilu west=Asmismu';
        fileProcessor.init()
            .then(() => {
                expect(fileProcessor.fileLines).to.be.a('array');
                expect(fileProcessor.fileLines[0]).to.equal(firstCity);
            })
    });

    xit('it can pass this to the WorldMap instance', function() {
        expect.fail();
    });

    xit('it should print out whatever is left of the world in the same format as the input file', function() {
        expect.fail();
    });

});
