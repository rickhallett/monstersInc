const { it } = require('mocha');
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

    it('can read in a world map file', function(done) {
        const rawData = fileProcessor.readInFile();
        rawData.then(res => {
            expect(res).to.be.an.instanceOf(Buffer);
            done()
        }).catch(err => {
            console.log(err)
        });
    });

    it('converts the read file into a string that acceptable to parser', function(done) {
        const rawData = fileProcessor.readInFile();
        rawData.then(res => {
            const acceptableString = fileProcessor.convertBufferToString(res);
            expect(acceptableString).to.equal(smallWorldMapString);
            done();
        }).catch(err => {
            console.log(err)
        });
    });

    it('it can parse the map string into lines representing cities', function(done) {
        const firstCity = 'E north=Mu south=Aninige east=Dimilu west=Asmismu';
        fileProcessor.init()
            .then(() => {
                expect(fileProcessor.fileLines).to.be.a('array');
                expect(fileProcessor.fileLines[0]).to.equal(firstCity);
                done()
            }).catch(err => {
                console.log(err)
            })
    });

    it('it can pass this to the WorldMap instance', function(done) {
        fileProcessor.init()
            .then(() => {
                const lines = fileProcessor.getFileLines();
                expect(lines).to.be.a('array');
                done();
            }).catch(err => {
                console.log(err)
            })
    });

    xit('it should print out whatever is left of the world in the same format as the input file', function() {
        expect.fail();
    });

});
