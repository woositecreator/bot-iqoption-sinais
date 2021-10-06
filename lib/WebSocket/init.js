const WebSocket = require("ws")
const Settings = require("../settings")

const {
	protocol,
	host,
	port,
	path
} = Settings.WEBSOCKET.GATEWAY

const websocket = new WebSocket(protocol + "://" + host + ":" + port + "/" + path);

exports.init = function() {

	this.socket = websocket

	this.socket.on("message", message => {
		message = JSON.parse(message)
		this.emitter.emit(message.name, message)
	})

	return new Promise((resolve, reject) => {
		this.socket.on("open", resolve)
		this.socket.on("error", reject)
	})
}

exports.websocket = websocket;