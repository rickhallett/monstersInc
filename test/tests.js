
const monsters = require('../index');
const { expect } = require('chai');

describe('Game', function() {

    it('can read in a world map file', function() {
        expect.fail();
    });

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

    it('has a city for every line of the read in file', function() {
        expect.fail();
    });

    it('can calculate the remaining number of monsters', function() {
        expect.fail();
    });

    // it('', function() {
    //     expect.fail();
    // });

});

describe('City', function() {

    it('has an assigned name', function() {

    });

    it('has key-value links to other cities', function() {

    });

    it('is aware if a monster is occupying it', function() {

    });

    it('is destroyed if two monsters are occupying it', function() {

    });

});

describe('Monsters', function() {

    it('are assigned a unique identifier', function() {

    });

    it('are assigned names', function() {

    });

    it('move in a random direction each turn', function() {

    });

    it('can be trapped and unable to move', function() {

    });

});
