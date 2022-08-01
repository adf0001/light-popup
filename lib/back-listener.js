
var { getBody } = require("./part");
var { hide } = require("./hide");

var backListener = function () {
	if (!getBody(this)?.classList.contains('light-popup-modal'))
		hide(this);
}

//module exports

module.exports = {
	backListener,
};
