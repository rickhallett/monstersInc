const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

class FileProcessor {
    constructor(filepath = null) {
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

    parseRemainingMapForOutput(worldMap) {
        const linesToPrint = [];
        worldMap.map.forEach(city => {
            let constructedString = '';
            constructedString += (`${city.cityName} `);

            const directions = Object.keys(city.cityLinks);
            directions.forEach(direction => {
                if (city.cityLinks[direction]) {
                    constructedString += (`${direction}=${city.cityLinks[direction]} `);
                }

            });

            constructedString += '\n';

            linesToPrint.push(constructedString);
        });
        return linesToPrint;
    }

    printToFile(worldMap) {
        const lines = this.parseRemainingMapForOutput(worldMap);
        const fileName = `remaining_map-${Date.now()}.txt`;
        lines.forEach(line => {
            fs.writeFileSync(fileName, line, { flag: 'a' });
        });
    }



}

module.exports = FileProcessor;


