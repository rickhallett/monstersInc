
const monsters = require('../index');
const { expect } = require('chai');

describe('FileProcessor', function() {

    it('can read in a world map file', function() {
        expect.fail();
    });

    it('can parse the file into a javascript object', function() {
        expect.fail();
    });

    it('it can pass this object to the WorldMap instance', function() {
        expect.fail();
    });

    it('it should print out whatever is left of the world in the same format as the input file', function() {
        expect.fail();
    });

});

describe('Game', function() {

    it('can read in a command line argument and store this', function() {
        expect.fail();
    });

    it('directs the game in ticks (turns)', function() {
        expect.fail();
    });

    it('can generate N monsters', function() {
        expect.fail();
    });

    it('places monsters randomly on the world map', function() {
        expect.fail();
    });

    it('terminates if all the monsters have been destroyed', function() {
        expect.fail();
    });

    it('terminates if each remaining monster has moved 10,000 times', function() {
        expect.fail();
    });

});

describe('WorldMap', function() {

    it('can create a JavaScript object representing the file', function() {
        expect.fail();
    });

    it('has a city for every line of the read in file', function() {
        expect.fail();
    });

    it('can calculate the remaining number of monsters', function() {
        expect.fail();
    });

});

describe('City', function() {

    it('has an assigned name', function() {
        expect.fail();
    });

    it('has key-value links to other cities', function() {
        expect.fail();
    });

    it('is aware if a monster is occupying it', function() {
        expect.fail();
    });

    it('is destroyed if two monsters are occupying it', function() {
        expect.fail();
    });

});

describe('Monster', function() {

    it('each is assigned a unique identifier', function() {
        expect.fail();
    });

    it('each is assigned a name', function() {
        expect.fail();
    });

    it('can move in a random direction each turn', function() {
        expect.fail();
    });

    it('can be trapped and unable to move', function() {
        expect.fail();
    });

});
