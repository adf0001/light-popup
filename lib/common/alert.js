
var query_by_name_path = require("query-by-name-path");

var { showHtml } = require("../show-html");
var { closeListener } = require("../listener-tool");

//refer .show()
var alert = function (message, options) {
	var elPopup = showHtml(require("./alert.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".ok").addEventListener("click", closeListener);

	return elPopup;
}

//module exports

module.exports = {
	alert,
};
