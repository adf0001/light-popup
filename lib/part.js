
var ele_id = require("ele-id");

var getPopup = function (el) {
	while (el && !el.classList?.contains("light-popup")) {		//if not exist, document --> null
		el = el.parentNode;
	}
	return el;
}

var getBody = function (el) {
	el = getPopup(el);
	if (el) {
		el = el.querySelector("#" + ele_id(el) + " > .light-popup-body");
	}
	return el;
}

//module exports

module.exports = {
	getPopup,
	getBody,
};
