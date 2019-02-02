class WorldMap {
    constructor() {
        this.map = new Set();
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
        node[cityName] = {};
    }

    assignNodeCityLink(node, cityName, link) {
        const { direction, linkedCity } = this.parseDirection(link);
        node[cityName][direction] = linkedCity;
    }

    ifElementIsCityName(i) {
        return i === 0;
    }

    constructMap(fileLines) {
        const parsedFileLines = this.parseFileLines(fileLines);
        parsedFileLines.pop();

        const node = {};

        parsedFileLines.forEach((line) => {
            const cityName = this.getCity(line);
            line.forEach((link, i) => {
                if (this.ifElementIsCityName(i)) {
                    this.assignNodeCityName(node, cityName);
                } else {
                    this.assignNodeCityLink(node, cityName, link);
                }
            });

            this.map.add(node);


        });

    }
}

module.exports = WorldMap;

/*
extract city as first city array element
use this to add a property to the Set
extract the remaining elements one at a time
    feed each remaining element into determineDirection()
    add each processes direction to the map under the city name


determineDirection()
    use a regex to grab left hand side
    use a regex to grab the right hand side
        return back the direction and city to be placed into the Set

 */
