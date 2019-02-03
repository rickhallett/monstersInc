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

        parsedFileLines.forEach((line) => {
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

                if (monsters.length === 0 && citiesFilled === self.originalMonsters.length) {
                    return false;
                }

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

    calculateRemainingMonsters() {
        const remainers = [];
        this.map.forEach(city => {
            if (city.occupiers.length > 0) {
                city.occupiers.forEach(remainer => {
                    remainers.push(remainer);
                });
            }
        });
        return remainers.length;
    }

    allMonstersMove() {
        this.map.forEach(city => {
           const monster = city.occupiers.pop() || null;
           const direction = monster ? monster.move() : null;
           const destinationCity = direction ? city.cityLinks[direction] : null;

           if(destinationCity) {
               const clonedCity = cloneDeep(this.map.get(destinationCity));
               clonedCity.occupiers.push(monster);
               this.map.set(destinationCity, clonedCity);
           } else {
               city.occupiers.push(monster);
           }

        });

        return this;
    }

    destroyOverOccupiedCities() {
        this.map.forEach(city => {
           if (city.occupiers.length > 1){
               // NOTE: this solution takes the monsters with it, is this functionally equivalent to trapped? Does it make more semantic sense even if the specs do not ask for it?
               this.map.delete(city.cityName);
               this.destroyLinksToThis(city);
           }
        });

        return this;
    }

    destroyLinksToThis(city) {
        const cityName = city.cityName;
        const clonedCity = cloneDeep(city);
        this.map.forEach(c => {
           if (Object.values(c.cityLinks).includes(city.cityName)) {
               const index = Object.values(c.cityLinks).indexOf(city.cityName);
               const directionToDelete = Object.keys(c.cityLinks)[index];
               // delete clonedCity.cityLinks[directionToDelete];
               // this.map.set(cityName, clonedCity);
               const clonedCityLinks = cloneDeep(c.cityLinks);
               delete clonedCityLinks[directionToDelete];
               c.cityLinks = clonedCityLinks;

           }
           // TODO: at this point here, the maps seems to have been successfully modified, but has it only been modified within the scope of the forEach callback function? (i.e. modifying parameters isn't modifying the actual this.map?
        });
    }
}

module.exports = WorldMap;
