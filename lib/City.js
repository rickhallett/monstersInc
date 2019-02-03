class City {
    constructor({ cityName, cityLinks, occupiers }) {
        this.cityName = cityName;
        this.cityLinks = cityLinks;
        this.occupiers = occupiers;
        this.isDestroyed = false;
    }
}

module.exports = City;
