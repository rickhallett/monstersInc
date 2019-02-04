const { it } = require('mocha');
const { expect } = require('chai');
const Game = require('../lib/Game');

describe('Game', function() {

    let game;

    beforeEach(function() {
       game = new Game(100);
    });

    // TODO: is this a meaningful test?
    it('can generate N monsters', function() {
        const monsters = game.generateMonsters();
        expect(monsters.length).to.equal(100);
    });

    // TODO: is this a meaningful test?
    // xit('places monsters randomly on the world map', function() {
    //
    // });
    //
    // xit('terminates if all the monsters have been destroyed', function() {
    //     expect.fail();
    // });
    //
    // xit('terminates if each remaining monster has moved 10,000 times', function() {
    //
    // });
});
