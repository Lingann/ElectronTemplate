// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html 插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/renderer/main.js",
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "[name].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './renderer/index.ejs',
            // inject: false,
            hash: true,
            template: './src/renderer/index.ejs'
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, './src/server'), // 不打包直接输出的文件
        //         to: 'server', // 打包后静态文件放置位置
        //         ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
        //     }
        // ]),
    ]
};