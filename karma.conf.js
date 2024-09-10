module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine", "@angular-devkit/build-angular"],
		plugins: [
			require("karma-jasmine"),
			require("karma-chrome-launcher"),
			require("karma-jasmine-html-reporter"),
			require("karma-coverage"),
			require("@angular-devkit/build-angular/plugins/karma"),
		],
		client: {
			clearContext: false,
		},
		files: [{ pattern: "./src/test.ts", watched: false }],
		preprocessors: {
			"./src/test.ts": ["coverage"],
		},
		coverageReporter: {
			dir: require("path").join(
				__dirname,
				"./coverage/online-voting-system"
			),
			subdir: ".",
			reporters: [{ type: "html" }, { type: "text-summary" }],
		},
		reporters: ["progress", "kjhtml", "coverage"],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ["ChromeHeadless"],
		singleRun: false,
		restartOnFileChange: true,
	});
};
