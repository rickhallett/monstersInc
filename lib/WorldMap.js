const City = require('./City');

class WorldMap {
    constructor() {
        this.map = new Set();
        this.City = City;
    }

    parseFileLines(fileLines) {
        return fileLines.map(line => line.split(' '));
    }

    getCity(data) {
        return data[0];
    }

    parseDirection(linkData) {
        const [direction, linkedCity] = linkData.split('=');
        return { direction, linkedCity };
    }

    assignNodeCityName(node, cityName) {
        node.cityName = cityName;
    }

    assignNodeCityLink(node, cityName, link) {
        const { direction, linkedCity } = this.parseDirection(link);
        // node[cityName][direction] = linkedCity;
        node.cityLinks[direction] = linkedCity;
    }

    ifElementIsCityName(i) {
        return i === 0;
    }

    constructMap(fileLines) {
        const parsedFileLines = this.parseFileLines(fileLines);
        if(parsedFileLines.length > 1) {
            parsedFileLines.pop();
        }

        const node = {
            cityName: null,
            cityLinks: {
                north: null,
                south: null,
                east: null,
                west: null,
            },
            occupiers: [],
        };

        parsedFileLines.forEach((line) => {
            const cityName = this.getCity(line);
            line.forEach((link, i) => {
                if (this.ifElementIsCityName(i)) {
                    this.assignNodeCityName(node, cityName);
                } else {
                    this.assignNodeCityLink(node, cityName, link);
                }
            });

            this.map.add(new this.City(node));
        });
    }
}

module.exports = WorldMap;
