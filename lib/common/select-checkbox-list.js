
var query_by_name_path = require("query-by-name-path");
var insert_adjacent_return = require("insert-adjacent-return");

var { getBody } = require("../part");
var { showHtml } = require("../show-html");
var { hide } = require("../hide");
var { closeListener } = require("../listener-tool");
var { setClass } = require("set-class");

var selectCheckboxChangeListener = function () {
	setClass(this.parentNode, this.checked ? "light-popup-selected" : "", this.checked ? "" : "light-popup-selected");
}

var selectCheckboxListener = function () {
	var elBody = getBody(this);
	var items = elBody.querySelectorAll('input:checked');
	var i, a = [];		//return empty array if nothing selected
	for (i = 0; i < items.length; i++) {
		a[i] = items[i].value;
	};
	hide(this, a);
}

/*
refer .show()

selectCheckboxList( message, options )

	options
		.maxHeight
			max height;
		
		.itemList
			array of item;
				item:
					[value,text], or single string for both value and text;
		
		.defaultValueList
			default value list;

*/
var selectCheckboxList = function (message, options) {
	var { itemList, defaultValueList, maxHeight } = options || {};

	var elPopup = showHtml(require("./select-list.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".ok").addEventListener("click", selectCheckboxListener);
	query_by_name_path(elPopup, ".cancel").addEventListener("click", closeListener);

	if (!defaultValueList) defaultValueList = [];
	else if (typeof defaultValueList === "string") defaultValueList = [defaultValueList];

	var elInput = query_by_name_path(elPopup, '.input');
	if (maxHeight) elInput.style["max-height"] = maxHeight;

	var i, imax = itemList.length, v, elItem, elCheck, isSelected, sep = false;
	for (i = 0; i < imax; i++) {
		v = itemList[i];

		if (!v) continue;	//skip empty

		if (v === "-") {	//separator flag
			sep = true;
			continue;
		}

		if (!(v instanceof Array)) v = [v, v];

		elItem = insert_adjacent_return.append(elInput,
			"<label class='light-popup-list-item'" + (sep ? " style='margin-top:1em;'" : "") + "></label>");
		sep = false;
		elItem.innerHTML = " " + v[1];
		isSelected = (defaultValueList.indexOf(v[0]) >= 0);
		if (isSelected) setClass(elItem, "light-popup-selected");

		elCheck = insert_adjacent_return.prepend(elItem, "<input type='checkbox'></input> ");
		elCheck.value = v[0];
		if (isSelected) elCheck.checked = true;

		elCheck.addEventListener("change", selectCheckboxChangeListener);
	}

	return elPopup;
}

//module exports

module.exports = {
	selectCheckboxList,
};
