const { expect } = require('chai');
const FileProcessor = require('../lib/FileProcessor');
const { smallWorldMapString } = require('../constants');

describe('FileProcessor', function() {

    let fileProcessor;

    beforeEach(function(){
        fileProcessor = new FileProcessor();
    });

    it('exports a FileProcessor constructor', function() {
        const FileProcessor = require('../lib/FileProcessor');
        const aFileProcessorInstance = new FileProcessor();
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

    it('can parse the file into a javascript object', function() {
        expect.fail();
    });

    it('it can pass this object to the WorldMap instance', function() {
        expect.fail();
    });

    it('it should print out whatever is left of the world in the same format as the input file', function() {
        expect.fail();
    });

});
