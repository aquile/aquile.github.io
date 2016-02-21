var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV || 'production';
var DEV = (NODE_ENV === 'development');  //npm run-script build

var PROD = (NODE_ENV === 'production');



module.exports = {
    entry: {
        // точки входа для приложения - те жс файлы, которые будут инициализированны
        view: path.join(__dirname, 'view.js'),
        configuration: path.join(__dirname, 'configuration.js'),
    },

    output: {
        //path:  path.join(__dirname, 'dist'),
        path:  path.join(__dirname, '..','..','tiles','etools-tile','public','javascripts'), // нод жс фигня, которая собирает путь и сама вставляет слешы в зависимости от системы
        filename: '[name].js'
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env':{
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: PROD,
        //     mangle: PROD,
        //     comments: DEV
        // })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.(jpg|png|gif)$/i,
                loader: 'url?limit=1000'
            },
            {
                test: /.css$/,
                loader: 'style!css'
            }]
    }
};

if (DEV) {
    module.exports.devtool = 'eval-source-map'
}