const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: {
                    loader: 'underscore-template-loader',
                    query: {
                        // root: "myapp",
                        attributes: ['img:src', 'x-img:src']
                    }
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            // output: 'css/',
                            publicPath:"../",
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                            // hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
        })
    ]
};