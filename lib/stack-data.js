
var stack = null;	//item: [elPopup, options ]

var getStack = function (create) {
	return (create && !stack) ? (stack = []) : stack;
}

//module exports

module.exports = {
	getStack,
};
