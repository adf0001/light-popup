
var { getPopup } = require("./part");
var { getStack } = require("./stack-data");

var getOptions = function (el) {
	var elPopup = getPopup(el);
	if (!elPopup) return;

	var statckData = getStack();
	if (!statckData) return;

	for (var i = statckData.length - 1; i >= 0; i--) {
		if (statckData[i][0] === elPopup) return statckData[i][1];
	}
}

//module exports

module.exports = {
	getOptions
};
