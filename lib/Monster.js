const uuidv4 = require('uuid/v4');
const faker = require('faker');

class Monster {
    constructor() {
        this.id = uuidv4();
        this.monsterCard = faker.helpers.createCard();
        this.isTrapped = false;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    move() {
        const validDirections = ['north', 'south', 'east', 'west'];
        const chosenDirection = validDirections[this.getRandomInt(3)];
        return chosenDirection;
    }

    trap() {
        this.isTrapped = true;
    }

    destroyCity(city) {
        return city.isDestroyed = true;
    }
}

module.exports = Monster;

