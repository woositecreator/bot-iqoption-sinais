const Buy = require("./buy")

module.exports = function(options) {
	return new Buy(this, options)
}