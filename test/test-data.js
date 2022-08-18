
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

	".showHtml()": function (done) {
		_ele('divResult2').innerHTML =
			"<label><input id='chkModaless' type='checkbox'></input>modal ( default modeless)</label><br>" +
			"<button id='btnOpenPopup1' onclick=\"light_popup.showHtml('title-1<hr>message-1',{modal:_ele('chkModaless').checked,})\">.showHtml()</button> " +
			
			"<button id='btnOpenPopup2' onclick=\"light_popup.alert('message-2, <span name=ok>ok test</span>',{modal:_ele('chkModaless').checked,} )\">alert()</button> " +
			"<button id='btnOpenPopup2' onclick=\"light_popup.alert('message-2, <span name=ok>ok test</span>',{modal:_ele('chkModaless').checked,cb:(err,data)=>{alert([err,data]);},cbEvent:(err,data)=>{console.log(err,data);},maximizeButton:true} )\">alert() cb/event</button> " +

			"<button id='btnOpenPopup3' onclick=\"light_popup.confirm('message-3',{modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">confirm()</button> " +
			"<button id='btnOpenPopup3' onclick=\"light_popup.confirm('message-3 message-3 message-3 message-3',{modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">confirm()-2</button> " +
			"<button id='btnOpenPopup4' onclick=\"light_popup.confirmYnc('message-4',{modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">confirmYnc()</button> " +
			"<button id='btnOpenPopup5' onclick=\"light_popup.prompt('message-5',{defaultValue:'default-value',modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">prompt()</button> " +
			"<button id='btnOpenPopup5' onclick=\"light_popup.prompt('add new project path',{defaultValue:'default-value',modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">prompt()-2</button> " +
			"<button id='btnOpenPopupS' onclick=\"light_popup.showHtml(popupHtmlStackHtml+'<br>'+(new Date()),_ele('chkModaless').checked)\">.showHtml-stack</button> " +

			"<button id='btnOpenPopupSelect' onclick=\"light_popup.selectRadioList('select message 1',{itemList:['aaa',['bbb','文本bbb'],'ccc'],defaultValue:'bbb',modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">selectRadioList()</button> " +
			"<button id='btnOpenPopupSelect-2' onclick=\"light_popup.selectRadioList('select message 1',{itemList:['aaa',['bbb','文本bbb'],'ccc'],modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\" title='if select void, exception raise and stop the process'>selectRadioList()-2/void</button> " +

			"<button id='btnOpenPopupSelect2' onclick=\"light_popup.selectCheckboxList('select message 2',{itemList:['aaa',['bbb','文本bbb'],'ccc'],defaultValueList:['bbb','ccc'],modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">selectCheckboxList()</button> " +
			"<button id='btnOpenPopupSelect2-2' onclick=\"light_popup.selectCheckboxList('select message 2',{itemList:['aaa',['bbb','文本bbb'],'ccc'],modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\" title='if select void, return empty list'>selectCheckboxList()-2/void</button> " +
			"<button id='btnOpenPopupSelect2-3' onclick=\"light_popup.selectCheckboxList('select message 2',{itemList:['aaa',['bbb','文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb '],'ccc','ccc2'," +
			"		'ccc3','ccc4','-','ccc5-sep','ccc6',null,'ccc7-skip null','ccc8','ccc9','ccc10','ccc11','ccc12','ccc13','ccc14'],defaultValueList:['bbb','ccc'],modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">selectCheckboxList()-3</button> " +

			"<button id='btnOpenPopupSelect2-4' onclick=\"light_popup.selectButtonList('select message 3',{itemList:['aaa',['bbb','文本bbb'],'ccc'],modal:_ele('chkModaless').checked,cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">selectButtonList()</button> " +
			"<button id='btnOpenPopupSelect2-5' onclick=\"light_popup.selectButtonList('select message 2',{itemList:['aaa',['bbb','文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb 文本bbb '],'ccc',['ccc2','<div style=\\'color:red;text-align:left;\\'>ccc2</div>','cursor:wait;',{disabled:true}],'ccc3'," +
			"		'ccc4','ccc5','-','ccc6-sep',['ccc7',null,'color:orange;text-align:right;'],null,'ccc8-skip null','ccc9','ccc10','ccc11','ccc12','ccc13','ccc14'],modal:_ele('chkModaless').checked,maxHeight:'15em',cb:function(err,data){if(err||data)alert('returned: error='+err+', data='+data);}})\">selectButtonList()-2</button> " +
			"";

		window.popupHtmlStackHtml = "title-S<hr>message-S <span class='-ht-cmd' onclick='openPopupHtmlStack()'>open another</span>";

		window.openPopupHtmlStack = function () { _ele('btnOpenPopupS').click(); };

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
