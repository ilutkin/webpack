const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const fileName = (name, ext) => `${name}.[contenthash:6].${ext}`;

const config = {
    entry: './resources/index.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: fileName(`bundle`, `js`),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: fileName(`style`, `css`)
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            meta: {
                charset: 'utf-8',
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            template: './resources/index.html',
            publicPath: '/dist/',
            filename: '../index.html',
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new UglifyJsPlugin({
                include: /\.js$/
            })
        ],
    },
};

module.exports = config;