
var ele = require("get-element-by-id");

var { getPopup } = require("./part");
var { getStack } = require("./stack-data");
var { maxListener } = require("./max-listener");

var hide = function (el, data) {
	el = ele(el);

	//find popup
	el = getPopup(el);
	if (!el) {
		console.error("top light-popup unfound");
		return;
	}

	//restore maximized
	var elMax = el.querySelector("span[name='light-popup-max']");
	if (elMax) { maxListener.call(elMax, null, true); }

	var stackData = getStack();

	var i, psi;
	for (i = stackData.length - 1; i >= 0; i--) {
		psi = stackData[i];
		if (el === psi[0]) {
			el.style.display = "none";
			stackData.pop();
			psi[1]?.cb?.call(psi[1].cbThis, null, data);	//the options maybe empty
			return;
		}

		if (psi[0].style.display == "none") {
			stackData.pop();
			continue;
		}

		break;	//fail
	}

	if (!stackData.length) return;

	//abnormal popup, close all.
	console.error("abnormal popup, close all.");
	while (stackData.length > 0) {
		stackData.pop()[0].style.display = "none";
	}
}

//module exports

module.exports = {
	hide,
};
