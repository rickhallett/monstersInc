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

    /*
    while monsters
        pick a random city
        pop of a monster from the array
        if no monster is occupying
            place monster into the occupiers array
        if occupied
            pick another random city
     */

    pickRandomCity() {
        const randomIndex = Math.floor(Math.random() * this.map.size);
        let iterator = 0;
        for (const key of this.map.keys()) {
            if (iterator++ === randomIndex) {
                let test = this.map.has(key);
                return key;
            }
        }

    }

    cityIsUnoccupied(city) {
        // return Boolean(city.occupiers);
        let inspect = this.map.get(city)
        return !Boolean(this.map.get(city).occupiers.length)
    }

    populateMap(monsters) {
        const self = this;
        const numberOfCities = this.map.size;
        let citiesFilled = 0;

        // recursive IIFE
        (function placeMonster(monster){

            if(citiesFilled < numberOfCities) {
                const city = self.pickRandomCity();
                if (self.cityIsUnoccupied(city)) {

                    // OPTION 1: cannot read property 'occupiers' of undefined
                    // self.map[city].occupiers.push(monster);

                    // OPTION 2: this, somehow, pushes the monster object to EVERY city in the Set....wtflol
                    // city.occupiers.push(monster);

                    // OPTION 3: iterate over set and only change if found
                    // self.map.forEach(key => {
                    //     if (key.cityName === city.cityName) {
                    //         key.occupiers.push(monster);
                    //     }
                    // });

                    // OPTION 4: use a Map as opposed to a set, and to prevent duplicates, delete the key, push in monsters, and then add back in
                    // self.map.delete(city);
                    // city.occupiers.push(monster);
                    // self.map.set(city);

                    // OPTION 5:
                    // self.map.get(city).occupiers.push(monster);

                    // OPTION 6: deep clone the city to remove memory references
                    const clonedCity = cloneDeep(self.map.get(city));
                    clonedCity.occupiers.push(monster);
                    self.map.set(city, clonedCity);



                    // keep a record of how many cities have been filled so we don't recurse forever...
                    citiesFilled++;

                    // recursive case 1 (place next monster in line)
                    return placeMonster(monsters.pop())
                } else {
                    //  RECURSIVE CASE 2 (attempt to find an unoccupied city for this poor homeless fella)
                    return placeMonster(monster)
                }
            }

            // base case
            return false;

        })(monsters.pop());

        console.log(this.map)
    }
}

module.exports = WorldMap;
