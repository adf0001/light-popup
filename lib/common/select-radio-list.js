
var query_by_name_path = require("query-by-name-path");
var insert_adjacent_return = require("insert-adjacent-return");
var query_by_attribute = require("query-by-attribute");

var { getBody } = require("../part");
var { showHtml } = require("../show-html");
var { hide } = require("../hide");
var { closeListener } = require("../listener-tool");
var { setClass, setByElement } = require("set-class");

var selectRadioChangeListener = function () {
	if (!this.checked) return;

	var elBody = getBody(this);
	var elInput = query_by_name_path(elBody, '.input');

	var oldv = elInput.getAttribute('value');

	var oldel = query_by_attribute(elInput, 'input', 'value', oldv);
	if (oldel) oldel.checked = false;

	setByElement("light-popup-selected", this.parentNode, oldel?.parentNode);
	elInput.setAttribute('value', this.value);
}

var selectRadioListener = function () {
	var elBody = getBody(this);
	var elInput = query_by_name_path(elBody, '.input');
	//if no radio is checked, process will be stopped by error.
	hide(elBody, elInput.querySelector('input:checked').value);
}

/*
refer .show()

selectRadioList( message, options )

	options
		.maxHeight
			max height;
		
		.itemList
			array of item;
				item:
					[value,text], or single string for both value and text;
		
		.defaultValue
			default value;

*/
var selectRadioList = function (message, options) {
	var { itemList, defaultValue, maxHeight } = options || {};

	if (!defaultValue) defaultValue = "";

	var elPopup = showHtml(require("./select-list.htm"), options);

	query_by_name_path(elPopup, ".message").innerHTML = message;
	query_by_name_path(elPopup, ".ok").addEventListener("click", selectRadioListener);
	query_by_name_path(elPopup, ".cancel").addEventListener("click", closeListener);

	var elInput = query_by_name_path(elPopup, '.input');
	elInput.setAttribute("value", defaultValue);
	if (maxHeight) elInput.style["max-height"] = maxHeight;

	var i, imax = itemList.length, v, elItem, elRadio, isSelected, sep = false;
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
		isSelected = (v[0] == defaultValue);
		if (isSelected) setClass(elItem, "light-popup-selected");

		elRadio = insert_adjacent_return.prepend(elItem, "<input type='radio'></input> ");
		elRadio.value = v[0];
		if (isSelected) elRadio.checked = true;

		elRadio.addEventListener("change", selectRadioChangeListener);
	}

	return elPopup;
}

//module exports

module.exports = {
	selectRadioList,
};
