/**
 * A Graveyard for Fools
 * 
 * (c) 2020 Jani Nykänen
 */


export class GameProgress {


    constructor() {

        this.maxHealth = 10;
        this.health = this.maxHealth;

        this.gems = 0;
        this.coins = 0;
        this.smallKeys = 0;
    }


    reset() {

        this.health = this.maxHealth;
    }


    reduceHealth(amount) {

        this.health = Math.max(0, this.health - amount);
    }


    addCoins(count) {

        this.coins += count;
    }


    addHealth(amount) {

        this.health = Math.min(this.maxHealth, this.health + amount);
    }


    getHealthRatio() {

        return this.health / this.maxHealth;
    }
}
