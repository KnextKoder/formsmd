var path = require("path");

module.exports = {
	mode: "production",
	entry: {
		formsmd: "./lib/main.js",
		composer: "./lib/composer.js",
	},
	output: {
		filename: "[name].bundle.min.js",
		path: path.resolve(__dirname, "dist/js"),
		libraryTarget: "window",
	},
	optimization: { minimize: true },
};
