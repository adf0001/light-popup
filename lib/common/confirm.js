
var query_by_name_path = require("query-by-name-path");

var { showHtml } = require("../show-html");
var { closeListener, closeByNameListener } = require("../listener-tool");


//refer .show()
var confirm = function (message, options) {
	var elPopup = showHtml(require("./confirm.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".ok").addEventListener("click", closeByNameListener);
	query_by_name_path(elPopup, ".cancel").addEventListener("click", closeListener);

	return elPopup;
}

//refer popup.show()
var confirmYnc = function (message, options) {
	var elPopup = showHtml(require("./confirm-ync.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".yes").addEventListener("click", closeByNameListener);
	query_by_name_path(elPopup, ".no").addEventListener("click", closeByNameListener);
	query_by_name_path(elPopup, ".cancel").addEventListener("click", closeListener);

	return elPopup;
}

//module exports

module.exports = {
	confirm,
	confirmYnc,
};
