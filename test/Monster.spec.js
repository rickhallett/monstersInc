const { it } = require('mocha');
const { expect } = require('chai');
const isUUID = require('is-uuid');
const faker = require('faker');
const Monster = require('../lib/Monster');
const City = require('../lib/City');

describe('Monster', function() {

    let monster = null;

    beforeEach(function() {
        monster = new Monster();
        let i = 0;
    });

    it('each is assigned a unique identifier', function() {
        expect(isUUID.v4(monster.id)).to.equal(true);
    });

    it('each is assigned a name', function() {
        expect(monster.monsterCard.name).to.be.a('string');
    });

    it('each is assigned a monster card for message generation', function() {
        const monsterCardKeys = Object.keys(monster.monsterCard);
        const exampleMonsterCardKeys = Object.keys(faker.helpers.createCard());

        expect(monsterCardKeys).to.deep.equal(exampleMonsterCardKeys);
    });

    it('can move in a random direction each turn', function() {
        const chosenDirection = monster.move();
        expect(chosenDirection).to.be.oneOf(['north', 'south', 'east', 'west']);
    });

    it('can be trapped and unable to move', function() {
        expect(monster.isTrapped).to.equal(false);
        monster.trap();
        expect(monster.isTrapped).to.equal(true);
    });

    it('can destroy a city', function() {
        const node = {
            cityName: 'Ege',
            cityLinks: {
                north: 'Dodala',
                south: 'Eludisnismu',
                east: 'Enolmu',
                west: 'Amasna',
            },
            occupiers: [],
        };

        const city = new City(node);
        expect(city.isDestroyed).to.equal(false);

        monster.destroyCity(city);
        expect(city.isDestroyed).to.equal(true);
    });

});
