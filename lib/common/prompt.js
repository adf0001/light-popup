
var query_by_name_path = require("query-by-name-path");

var { getBody, getPopup } = require("../part");
var { showHtml } = require("../show-html");
var { hide } = require("../hide");
var { closeListener } = require("../listener-tool");

var promptListener = function () {
	var elPopup = getPopup(this);
	hide(elPopup, query_by_name_path(getBody(elPopup), '.input').value);
}

/*
refer .show()

prompt( message, options )

	options
		.defaultValue
			default value;
*/
var prompt = function (message, options) {
	var elPopup = showHtml(require("./prompt.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".ok").addEventListener("click", promptListener);
	query_by_name_path(elPopup, ".cancel").addEventListener("click", closeListener);

	var defaultValue = options?.defaultValue || "";

	if (defaultValue !== null && typeof defaultValue !== "undefined")
		query_by_name_path(elPopup, '.input').value = defaultValue;

	return elPopup;
}

//module exports

module.exports = {
	prompt,
};
