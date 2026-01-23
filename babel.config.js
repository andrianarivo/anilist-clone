module.exports = (api) => {
	api.cache(true);
	return {
		presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],
		plugins: [
			[
				"module-resolver",
				{
					root: ["."],
					alias: {
						"@": ".",
						"@components": "./components",
						"@theme": "./theme",
						"@types": "./types",
						"@hooks": "./hooks",
						"@constants": "./constants",
						"@features": "./features",
					},
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
