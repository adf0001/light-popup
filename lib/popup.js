
/*
example:
	<div id='divPopup1' class='light-popup' style='display:none;'>
		<div class='light-popup-body'>
			popup-1<hr>This is popup-1.
		</div>
	</div>
	
	popup.show('divPopup1');
*/

var ele = require("get-element-by-id");
var add_css_text = require("add-css-text");
var argument_options = require("argument-options");
var insert_adjacent_return = require("insert-adjacent-return");

var drag_object = require("drag-object");

var popupStack = null;	//item: [el, options ]

var backClickListener = function () {
	if (!this.parentNode.querySelector('.light-popup-body').classList.contains('light-popup-modal'))
		hide(this);
}

var closeListener = function () {
	hide(this);
}

var closeByNameListener = function () {
	hide(this, this.getAttribute("name"));
}

var getPopup = function (el) {
	while (el && !el.classList.contains("light-popup")) { el = el.parentNode; }
	return el;
}

var getPopupBody = function (el) {
	while (el && !el.classList.contains("light-popup-body")) { el = el.parentNode; }
	return el;
}

var maxListener = function (evt, restore) {
	var el = getPopupBody(this);

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
}

/*
show popup

show(el, options | modal | cb )

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
		"all/default"|"none"|"first"|"user-defined"
	
	.maximizeButton
		flag to show maximize button;

	.maximized
		flag to show in maximized state;

return the popup element;
*/
var show = function (el, options) {
	//console.log(options);
	options = argument_options(options, { "boolean": "modal", "number": "modal", "function": "cb" });
	//console.log("new options", options);

	//==============================
	//init global
	if (!popupStack) {
		popupStack = [];

		add_css_text(require("./popup.css"));
	}

	//------------------------------

	el = ele(el);

	//check closed
	while (popupStack.length > 0) {
		if (popupStack[popupStack.length - 1][0].style.display == "none") popupStack.pop();
		else break;
	}

	//don't re-open
	var i, imax = popupStack.length;
	for (i = 0; i < imax; i++) {
		if (popupStack[i][0] === el) {
			console.error("fail to re-open popup, " + (el.id || ""));
			return;
		}
	}

	//check body
	var elBody = el.querySelector(".light-popup-body");
	if (!elBody) {
		console.error("light-popup-body unfound, " + (el.id || ""));
		return;
	}

	//==============================
	//init element

	if (!el.classList.contains("light-popup")) {
		el.classList.add("light-popup");	//ensure popup base
	}

	//add back
	if (!el.querySelector(".light-popup-back")) {
		var elBack = insert_adjacent_return.prepend(el, "<div class='light-popup-back'></div>");
		elBack.addEventListener("click", backClickListener);
	}

	//add close button
	var elClose = elBody.querySelector("span[name='light-popup-close']"), elTool;
	if (!elClose) {
		elTool = insert_adjacent_return.prepend(elBody, "<span style='float:right;'></span>");
		elClose = insert_adjacent_return.prepend(elTool,
			"<span name='light-popup-close' " +
			"class='light-popup-cmd' title='Close'>x</span>");
		elClose.addEventListener("click", closeListener);
	}
	else elTool = elClose.parentNode;

	//maximizeButton
	var elMax = elTool.querySelector("span[name='light-popup-max']");
	if (options.maximizeButton || options.maximized) {
		if (!elMax) {
			elMax = insert_adjacent_return.prepend(elTool,
				"<span name='light-popup-max' " +
				"class='light-popup-cmd' title='Maximize'>&and;</span>");
			elMax.addEventListener("click", maxListener);
		}
		else { elMax.style.display = ""; }

		if (options.maximized) setTimeout(function () { maxListener.call(elMax); }, 0);
	}
	else {
		if (elMax) { elMax.style.display = "none"; }
	}
	//------------------------------

	//drag handler
	var dragMode = options.dragMode;

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
			elTool.nextElementSibling.onmousedown = elTool.nextElementSibling.ontouchstart = drag_object.startListenerForParent;
		}
	}
	else {
		elBody.onmousedown = elBody.ontouchstart = drag_object.startListener;
		if (elTool.nextElementSibling) {
			elTool.nextElementSibling.onmousedown = elTool.nextElementSibling.ontouchstart = null;
		}
	}

	//modal setting
	if (options.modal) {
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

	el.style.zIndex = 10 + popupStack.length;

	popupStack.push([el, options]);

	return el;
}

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

	var i, psi;
	for (i = popupStack.length - 1; i >= 0; i--) {
		psi = popupStack[i];
		if (el === psi[0]) {
			el.style.display = "none";
			popupStack.pop();
			psi[1].cb?.call(psi[1].cbThis, null, data);
			return;
		}

		if (psi[0].style.display == "none") {
			popupStack.pop();
			continue;
		}

		break;	//fail
	}

	if (!popupStack.length) return;

	//abnormal popup, close all.
	console.error("abnormal popup, close all.");
	while (popupStack.length > 0) {
		popupStack.pop()[0].style.display = "none";
	}
}

//----------------------------------------------------------------------------------------

var POPUP_HTML_COUNT_MAX = 10;

//refer popup.show()
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

	elBody = elPopup.querySelector(".light-popup-body");
	elBody.innerHTML = bodyHtml;

	return show(nm, options);
}

// module

module.exports = {
	show,
	hide,

	closeListener,
	closeByNameListener,

	showHtml,

	getPopup,
	getPopupBody,
};
