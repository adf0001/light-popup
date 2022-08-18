
var ele = require("get-element-by-id");
var add_css_text = require("add-css-text");
var insert_adjacent_return = require("insert-adjacent-return");

var drag_object = require("drag-object");

var { getPopup, getBody } = require("./part");
var { getStack } = require("./stack-data");
var { closeListener } = require("./listener-tool");
var { backListener } = require("./back-listener");
var { maxListener } = require("./max-listener");

var LIGHT_POPUP_Z_INDEX_START = 10;

/*
show popup

show(el, options )

options
	.modal
		boolean type; modal mode flag;
	
	.cb
		function type; callback function for final close;

	.cbEvent
		function type; callback function for events excluded final close;
			the data argument is the event name;
	
	.cbThis
		optional, for .cb and .cbEvent;
	
	.dragMode
		drag mode;
			"all/default"
				all elements exculde command type;
			"first"
				drag by first element in popup body;
			"none"
				do not drag;
			"user-defined"
				untouched;
	
	.maximizeButton
		flag to show maximize button;

	.maximized
		flag to show in maximized state;
	
	.dragObject
		user-defined drag object

return the popup element;
*/
var show = function (el, options) {
	//==============================
	//init global
	var statckData = getStack();
	if (!statckData) {
		statckData = getStack(true);
		add_css_text(require("./res/light-popup.css"));
	}

	//------------------------------

	el = ele(el);
	el = getPopup(el) || el;	//el can be popup or sub element

	if (!el.classList.contains("light-popup")) {
		el.classList.add("light-popup");	//ensure popup base
	}

	//check closed
	while (statckData.length > 0) {
		if (statckData[statckData.length - 1][0].style.display == "none") statckData.pop();
		else break;
	}

	//don't re-open
	var i, imax = statckData.length;
	for (i = 0; i < imax; i++) {
		if (statckData[i][0] === el) {
			console.error("fail to re-open popup, " + (el.id || ""));
			return;
		}
	}

	//check body
	var elBody = getBody(el);
	if (!elBody) {
		console.error("light-popup-body unfound, " + (el.id || ""));
		return;
	}

	//==============================
	//init element

	//add back
	if (!el.querySelector(".light-popup-back")) {
		var elBack = insert_adjacent_return.prepend(el, "<div class='light-popup-back'></div>");
		elBack.addEventListener("click", backListener);
	}

	//add close button
	var elClose = elBody.querySelector("span[name='light-popup-close']"), elTool;
	if (!elClose) {
		elTool = insert_adjacent_return.prepend(elBody, "<span style='float:right;user-select:none;'></span>");
		elClose = insert_adjacent_return.prepend(elTool,
			"<span name='light-popup-close' " +
			"class='light-popup-cmd' title='Close'>x</span>");
		elClose.addEventListener("click", closeListener);
	}
	else elTool = elClose.parentNode;

	//maximizeButton
	var elMax = elTool.querySelector("span[name='light-popup-max']");

	var { maximizeButton, maximized, dragMode, dragObject, modal } = options || {};

	if (maximizeButton || maximized) {
		if (!elMax) {
			elMax = insert_adjacent_return.prepend(elTool,
				"<span name='light-popup-max' " +
				"class='light-popup-cmd' title='Maximize'>&and;</span>");
			elMax.addEventListener("click", maxListener);
		}
		else { elMax.style.display = ""; }

		if (maximized) setTimeout(function () { maxListener.call(elMax); }, 0);
	}
	else {
		if (elMax) { elMax.style.display = "none"; }
	}
	//------------------------------

	//drag handler
	if (!dragObject) dragObject = drag_object;

	if (dragMode === "user-defined") {	//untouch
	}
	else if (dragMode === "none") {
		elBody.onmousedown = elBody.ontouchstart = null;
		if (elTool.nextElementSibling) {
			elTool.nextElementSibling.onmousedown = elTool.nextElementSibling.ontouchstart = null;
		}
	}
	else if (dragMode === "first") {
		elBody.onmousedown = elBody.ontouchstart = null;
		if (elTool.nextElementSibling) {
			elTool.nextElementSibling.onmousedown = elTool.nextElementSibling.ontouchstart = dragObject.startListenerForParent;
		}
	}
	else {
		elBody.onmousedown = elBody.ontouchstart = dragObject.startListener;
		if (elTool.nextElementSibling) {
			elTool.nextElementSibling.onmousedown = elTool.nextElementSibling.ontouchstart = null;
		}
	}

	//modal setting
	if (modal) {
		elBody.classList.add("light-popup-modal");
		elClose.innerHTML = "[&times;]";
		if (elMax) elMax.innerHTML = "[&and;]";
	}
	else {
		elBody.classList.remove("light-popup-modal");
		elClose.innerHTML = "(&times;)";
		if (elMax) elMax.innerHTML = "(&and;)";
	}

	el.style.display = "";

	el.style.zIndex = LIGHT_POPUP_Z_INDEX_START + statckData.length;

	statckData.push([el, options]);

	return el;
}

//module exports

module.exports = {
	LIGHT_POPUP_Z_INDEX_START,

	show,
};
