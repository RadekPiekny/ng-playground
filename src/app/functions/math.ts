export class Randomizer {
    static getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    static getRandomIntNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getRandomIntNegativeNumber(min, max) {
        return Math.floor(Math.random() * (max - min+1) + min);
    }
}
