const cloneDeep = require('lodash/cloneDeep');
const City = require('./City');


class WorldMap {
    constructor() {
        this.map = new Map();
        this.originalMonsters = [];
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

            this.map.set(cityName, new this.City(node));
        });

        return this.map;
    }

    consumeMonsters(monsters) {
        this.originalMonsters = monsters.slice();
        this.populateMap(monsters);
    }

    pickRandomCity() {
        const randomIndex = Math.floor(Math.random() * this.map.size);
        let iterator = 0;
        for (const key of this.map.keys()) {
            if (iterator++ === randomIndex) {
                return key;
            }
        }

    }

    cityIsUnoccupied(city) {
        return !Boolean(this.map.get(city).occupiers.length)
    }

    populateMap(monsters) {
        const self = this;
        const numberOfCities = this.map.size;
        let citiesFilled = 0;

        (function placeMonster(monster){

            if(citiesFilled < numberOfCities) {
                const city = self.pickRandomCity();
                if (self.cityIsUnoccupied(city)) {

                    const clonedCity = cloneDeep(self.map.get(city));
                    clonedCity.occupiers.push(monster);
                    self.map.set(city, clonedCity);

                    citiesFilled++;
                    return placeMonster(monsters.pop())
                } else {
                    return placeMonster(monster)
                }
            }

            return false;

        })(monsters.pop());
    }
}

module.exports = WorldMap;
