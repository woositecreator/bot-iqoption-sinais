const { log } = require("./utils")
const storage = require('../storage');


const martinGales = storage.getStorage().martinGales;

const type = "BINARY" // BINARY OR DIGITAL

let finishedGale = false;
let winned = false;
let forcedStopMartinGale = false;

exports.operate = async function operate(API, active, action, duration) {	
	try {
		log("===============================")

		log(`ULTIMAS VELAS: ${action}`)
		log(`DIREÇAO: ${action}`)
		const winsValue = storage.getStorage().winsValue;
		const lossValue = storage.getStorage().losssValue;
		const stopGain = storage.getStorage().stopGain;
		const stopLoss = storage.getStorage().stopLoss;

		forcedStopMartinGale = false;
		async function tradeAgain() {
			for (let martinGale of martinGales) {	

				if(Number(martinGale) + lossValue >= stopLoss) {
					forcedStopMartinGale = true;
					storage.stopLoss();
					return;
				};

				if(winsValue >= stopGain) {
					forcedStopMartinGale = true;
					storage.stopGain();
					return;
				};

				const martinGaleNumber = martinGales.indexOf(martinGale)
				const isMartinGale = martinGale == martinGales[0]
				martinGale = martinGale.toFixed(2)

				log(isMartinGale ? `ENTRADA: R$ ${martinGale}` : `MG${martinGaleNumber}: R$ ${martinGale}`, false)
				const order = await API.buy({
					active,
					action: action,
					amount: martinGale,
					type,
					duration: duration //1 e 1 minutos
				})
				await order.close()
				//console.log(await API.getBalance('PRACTICE').amount);
				console.log('ordem', order.quote.win);


				if(!order.quote.win) {
					storage.addLossValue(Number(martinGale));
					if(lossValue >= stopLoss) {
						storage.stopLoss();
						forcedStopMartinGale = true;
					}
				};
				if(order.quote.win) {
					storage.addWinValue(Number(martinGale));
					if(winsValue >= stopGain) {
						storage.stopGain();
						forcedStopMartinGale = true;
					}
				};


				console.log("\nGanhei", ' ',storage.getStorage().winCount, ' ', 'Perdi', ' ', storage.getStorage().lossCount);

				const result = order.quote.win ? "WIN" : "LOSS"
				console.log("", result);

				if (martinGale == martinGales[martinGales.length - 1].toFixed(2)) {
					finishedGale = true;
					break
				}
				if (result == 'WIN') {
					winned = true;
					break
				}
			}
	}
		while((!finishedGale && !winned) && !forcedStopMartinGale) await tradeAgain();

		finishedGale = false;
		winned = false;
	} catch (error) {
		console.log(error)
	}
}