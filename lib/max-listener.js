
var { getBody } = require("./part");
var { getOptions } = require("./options");

var maxListener = function (evt, restore) {
	var el = getBody(this);

	if (!el) {
		console.error("top light-popup-body unfound");
		return;
	}
	if (el.style.position == "absolute") {
		//restore
		el.style.position = "relative";
		el.style.marginTop = null;
		var saveLeftTop = el.getAttribute("saveLeftTop");
		if (saveLeftTop) {
			saveLeftTop = saveLeftTop.split(",");
			el.style.left = saveLeftTop[0];
			el.style.top = saveLeftTop[1];
		}
		else {
			el.style.left = el.style.top = "auto";
		}
		el.style.bottom = el.style.right = "auto";

		this.style.background = "";
	}
	else if (!restore) {
		//maximize
		el.style.position = "absolute";
		el.style.marginTop = "0";
		el.setAttribute("saveLeftTop", el.style.left ? (el.style.left + "," + el.style.top) : "");
		el.style.left = el.style.top = el.style.bottom = el.style.right = "16px";

		this.style.background = "lime";
		this.style.backgroundClip = "content-box";
	}
	else return;

	var options = getOptions(el);
	if (options?.cbEvent) options.cbEvent.call(options.cbThis, null, (el.style.position == "absolute") ? "maximize" : "maximize-restore")
}

//module exports

module.exports = {
	maxListener,
};
