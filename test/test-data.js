
//global variable, for html page, refer tpsvr @ npm.
light_popup = require("../index.js");

module.exports = {

	".show() & .hide()": function (done) {
		_ele('divResult2').innerHTML =
			"<div id='divPopup1' style='display:none;'>" +
			"	<div class='light-popup-body' >" +
			"		<span>popup-1</span><hr>This is popup-1." +
			"	</div>" +
			"</div>" +
			"<div id='divPopup2' class='light-popup' style='display:none;'>" +
			"	<div class='light-popup-body' >" +
			"		popup-2<hr>This is popup-2, modal. <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup1',{dragMode:'first'})\">popup1</span>, title drag <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup2',1)\">popup2</span>, will fail <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup3',1)\">popup3</span>, maybe fail <br> " +
			"		<center><button onclick=\"light_popup.hide('divPopup2')\">close</button></center>" +
			"	</div>" +
			"</div>" +
			"<div id='divPopup3' class='light-popup' style='display:none;'>" +
			"	<div class='light-popup-body' >" +
			"		popup-3<hr>This is popup-3, stack. <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup1',{maximized:true})\">popup1</span>, maximized <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup2',{maximizeButton:true})\">popup2</span>, modaless, maybe fail <br> " +
			"		<span class='-ht-cmd' onclick=\"light_popup.show('divPopup3',1)\">popup3</span>, will fail <br> " +
			"		<center><button onclick=\"light_popup.hide('divPopup3','fromClose')\">close</button></center>" +
			"	</div>" +
			"</div>" +
			"<button id='btnOpenPopup1' onclick=\"light_popup.show('divPopup1',{dragMode:'none'})\">popup-1, no drag</button> " +
			"<button id='btnOpenPopup2' onclick=\"light_popup.show('divPopup2',1)\">popup-2, modal</button> " +
			"<button id='btnOpenPopup3' onclick=\"light_popup.show('divPopup3',{modal:true,maximizeButton:true,cb:function(err,data){if(err||data)alert('popup3 at btn returned: error='+err+', data='+data);}, cbEvent:(err,data)=>console.log(data)})\">popup-3, stack</button> " +
			"";

		_ele('btnOpenPopup1').click();
		return 'ui test';
	},

	"check exports": function (done) {
		for (var i in light_popup) {
			if (typeof light_popup[i] === "undefined") { done("undefined: " + i); return; }
		}
		done(false);

		console.log(light_popup);
		var list = "export list: " + Object.keys(light_popup).join(", ");
		console.log(list);
		return list;
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('light_popup', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
