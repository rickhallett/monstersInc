const fs = require('fs');
const { promisify } = require('util');

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
        return this.fileLines;
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


