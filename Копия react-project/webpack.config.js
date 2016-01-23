var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'production';
var DEV = {NODE_ENV === 'development'};
var PROD = {NODE_ENV === 'production'}

module.exports = {
	devtool: 'source-map',

	entry: './src/main.js',
	
	output: {
		path: './dist',
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React Demo Yeah!'
		}),
		new webpack.DefinePlugin({
			'process.env':{
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.Uglify.JsPlugin({
			minimize: PROD,
			mangle: PROD,
			comments: DEV
		})
	],
	module: {
		loaders: [
		{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	}

if (DEV) {
	
}