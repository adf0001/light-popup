
// light-popup @ npm, a simple popup tool.

//module exports
Object.assign(exports,
	require("./lib/part"),
	require("./lib/stack-data"),

	require("./lib/listener-tool"),

	require("./lib/show"),
	require("./lib/show-html"),
	require("./lib/hide"),

	//common
	require("./lib/common/alert"),
	require("./lib/common/confirm"),
	require("./lib/common/prompt"),
	require("./lib/common/select-radio-list"),
	require("./lib/common/select-checkbox-list"),
	require("./lib/common/select-button-list"),

);
