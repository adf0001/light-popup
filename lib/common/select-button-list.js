
var query_by_name_path = require("query-by-name-path");
var insert_adjacent_return = require("insert-adjacent-return");

var { showHtml } = require("../show-html");
var { closeListener, closeByNameListener } = require("../listener-tool");

/*
refer .show()

selectButtonList( message, options )

	options
		.maxHeight
			max height;
		
		.itemList
			array of button-item;
				button-item:
					[ name, inneHTML, button-style-string, button-attribute-object ];
					or a shortcut name;
					or "-", as a splitter;
					or null to skip;
*/
var selectButtonList = function (message, options) {
	var { itemList, maxHeight } = options || {};

	var elPopup = showHtml(require("./select-button-list.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;

	var elInput = query_by_name_path(elPopup, '.input');
	if (maxHeight) elInput.style["max-height"] = maxHeight;

	var i, imax = itemList.length, v, elItem, sep = false, attr, j;
	for (i = 0; i < imax; i++) {
		v = itemList[i];

		if (!v) continue;	//skip empty

		if (v === "-") {	//separator flag
			sep = true;
			continue;
		}

		if (!(v instanceof Array)) v = [v, v];

		elItem = insert_adjacent_return.append(elInput,
			"<button style='width:100%;display:block;margin-bottom:0.5em;" + (sep ? "margin-top:1em;" : "") + (v[2] || "") + "'></button>");
		sep = false;
		elItem.innerHTML = v[1] || v[0];
		elItem.setAttribute("name", v[0]);
		if (attr = v[3]) {
			for (j in attr) elItem.setAttribute(j, attr);
		}

		elItem.addEventListener("click", closeByNameListener);
	}
	//add last cancel
	elItem = insert_adjacent_return.append(elInput,
		"<button style='width:100%;display:block;margin-bottom:1px;margin-top:1em;'>Cancel</button>");
	elItem.addEventListener("click", closeListener);

	return elPopup;
}

//module exports

module.exports = {
	selectButtonList,
};
