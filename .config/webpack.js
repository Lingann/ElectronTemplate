// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html 插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
            {
                test: /\.(png|jp?g)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        publicPath:  (url, resourcePath, context) => {
                            // if (/my-custom-image\.png/.test(resourcePath)) {
                            //     return `other_public_path/${url}`;
                            // }
                            if (/img/.test(resourcePath)) {
                                return `../renderer/img/${url}`;
                            }
                            if (/image/.test(resourcePath)) {
                                return `public/renderer/image/${url}`;
                            }
                            return `img/${url}`;
                        },
                        outputPath: (url, resourcePath, context) => {
                            // if (/my-custom-image\.png/.test(resourcePath)) {
                            //     return `other_public_path/${url}`;
                            // }
                            if (/..\/img/.test(resourcePath)) {
                                return `img/${url}`;
                            }
                            if (/image/.test(resourcePath)) {
                                return `public/image/${url}`;
                            }

                            return `img/${url}`;
                        },
                        esModule: false,
                    }
                }],
                exclude: [path.join(__dirname,'../static_asset')]

            },
            {
                test: require.resolve('tinymce/tinymce'),
                use: [
                    {
                        loaders: [
                            'imports?this=>window',
                            'exports?window.tinymce'
                        ]
                    }
                ]

            },
            {
                test: /tinymce\/(themes|plugins)\//,
                use: [
                    {
                        loaders: [
                            'imports?this=>window'
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // tinymce: "tinymce/tinymce",
            // videojs: 'video.js/dist/video.min.js',
            // $: 'jquery/dist/jquery.min.js',
            // jQuery: 'jquery/dist/jquery.min.js'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // inject: false,
            hash: true,
            template: path.resolve(__dirname,'../src/renderer/view/index.ejs')
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/main'), // 不打包直接输出的文件
                to: '../main', // 打包后静态文件放置位置
                ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            },
            // { from: './node_modules/tinymce/plugins', to: './plugins' },
            // { from: './node_modules/tinymce/themes', to: './themes' },
            // { from: './node_modules/tinymce/skins', to: './skins' }
        ]),
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: 'css/[name].css',
            chunkFilename:'css/[name].css',
        })
    ]
};