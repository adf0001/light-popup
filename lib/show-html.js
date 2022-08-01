
var ele = require("get-element-by-id");
var insert_adjacent_return = require("insert-adjacent-return");

var { getBody } = require("./part");

var POPUP_HTML_COUNT_MAX = 10;

//refer .show()
var showHtml = function (bodyHtml, options) {
	//find empty html
	var i, nm, el;
	for (i = 1; i <= POPUP_HTML_COUNT_MAX; i++) {
		nm = "light-popup-html-" + i;
		el = ele(nm);
		if (!el) break;
		if (el.style.display == "none") break;
	}

	if (i > POPUP_HTML_COUNT_MAX) {
		console.error("popup-html stack overflow, max " + POPUP_HTML_COUNT_MAX);
		return;
	}

	//init
	var elPopup = ele(nm), elBody;
	if (!elPopup) {
		elPopup = insert_adjacent_return.append(
			document.body,
			"<div id='" + nm + "' class='light-popup' style='display:none;'>" +
			"<div class='light-popup-body'></div>" +
			"</div>"
		);
	}

	elBody = getBody(elPopup);
	elBody.innerHTML = bodyHtml;

	return show(nm, options);
}

//module exports

module.exports = {
	POPUP_HTML_COUNT_MAX,

	showHtml,
};
