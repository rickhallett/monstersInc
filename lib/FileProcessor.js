const fs = require('fs');
const { promisify } = require('util');
const constants = require('../constants');

const readFile = promisify(fs.readFile);

class FileProcessor {
    constructor(filepath) {
        this.filepath = filepath;
        this.fileLines = [];
    }

    async init(){
        const buffer = await this.readInFile();
        const mapString = this.convertBufferToString(buffer);
        this.fileLines = this.seperateFileIntoLines(mapString);
    }

    readInFile() {
        return readFile(this.filepath);
    }

    convertBufferToString(buffer) {
        return buffer.toString();
    }

    seperateFileIntoLines(str) {
        return str.split('\n');
    }

    getFileLines() {
        return this.fileLines;
    }

}

module.exports = FileProcessor;


// const fileProcessor = new FileProcessor(`${constants.rootDir}/world_map_small.txt`);
//
// fileProcessor.init()
//     .then(() => console.log(fileProcessor.getFileLines()));


