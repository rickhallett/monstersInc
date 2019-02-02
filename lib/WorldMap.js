class WorldMap {
    constructor() {
        this.map = new Set();
    }

    parseFileLines(fileLines) {
        return fileLines.map(line => line.split(' '));
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
