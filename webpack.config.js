const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './public/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.mp4/,
                use: {
                  loader: 'url-loader',
                  options: {
                    limit: 10000,
                    mimtetype: 'video/mp4',
                  }
                }
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                // exclude: [/node_modules/],
                // include: [/node_modules\/react-datepicker/],
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/, 
                loader: 'url-loader?limit=8192'
            },
           
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
}