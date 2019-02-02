const fs = require('fs');
const { promisify } = require('util');
const constants = require('../constants');

const readFile = promisify(fs.readFile);

class FileProcessor {
    constructor(filepath) {
    }

    async readInFile() {
        return await readFile(`${constants.rootDir}/world_map_small.txt`);
    }

    convertBufferToString(buffer) {
        return buffer.toString();
    }
}

module.exports = FileProcessor;

// const fileProcesor = new FileProcessor();
// console.log(fileProcesor.readInFile());
