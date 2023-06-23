const path = require('path');

module.exports = {
	mode: 'development', // or 'production' for a production build
	entry: {
		main: './src/main.ts',
		renderer: './src/renderer.ts'
	},
	target: 'electron-main',
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};
