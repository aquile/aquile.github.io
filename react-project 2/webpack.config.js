var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'production';
var DEV = (NODE_ENV === 'development');
var PROD = (NODE_ENV === 'production');

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
		new webpack.optimize.UglifyJsPlugin({
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
			loaders: DEV ? ['react-hot', 'babel'] : ['babel'],
		    },
            {
                test: /\.(jpg|png|giff)$/i,
                loader: 'url?limit=1000'
            },
            {
                test: /.css$/,
                loader: 'style!css'
            }]
	}
};

if (DEV) {
module.exports.devtool = 'source-map'
}