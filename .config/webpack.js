// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html 插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname,'../src/renderer/main.js'),
    output: {
        path: path.resolve(__dirname, '../build/renderer'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'underscore-template-loader',
                query: {
                    // root: "myapp",
                    attributes: ['img:src', 'x-img:src']
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // inject: false,
            hash: true,
            template: path.resolve(__dirname,'../src/renderer/index.ejs')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/main'), // 不打包直接输出的文件
                to: '../main', // 打包后静态文件放置位置
                ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            }
        ]),
    ]
};