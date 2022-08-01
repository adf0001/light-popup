
var { hide } = require("./hide");

var closeListener = function () {
	hide(this);
}

var closeByNameListener = function () {
	hide(this, this.getAttribute("name"));
}

//module exports

module.exports = {
	closeListener,
	closeByNameListener,
};
