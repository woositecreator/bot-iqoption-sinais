const operations = require('./utils/operation');

// CONFIGS

let martinGales = [
	80, 160, 360
];

let stopWin = 1222260;
let stopLoss = 122260;

// 


let lossCount = 0;
let winCount = 0;

let winsValue = 0;
let losssValue = 0;


class Storage {
    getStorage() {
        return {
            winsValue,
            losssValue,
            lossCount,
            winCount,
            martinGales,
            stopWin,
            stopLoss
        }
    }

    addWinCount(value) {
        winCount++;
    }

    addLossCount(value) {
        lossCount++;
    }

    addWinValue(value) {
        this.addWinCount();
        winsValue += value;
    }

    addLossValue(value) {
        this.addLossCount();
        losssValue += value;
    }

    setMartinGales(nmartinGales) {
        martinGales = [ ...nmartinGales ];
    }

    setStopWin(value) {
        stopWin = value;
    }

    setStopLoss(value) {
        stopLoss = value;
    }

    stopLoss() {
        console.log('STOPLOSS');
        operations.resetOperations();
    }

    stopGain() {
        console.log('STOPGAIN');
        operations.resetOperations();
    }
}

module.exports = new Storage();