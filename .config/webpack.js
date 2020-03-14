const path = require('path');                                   // 引入nodejs路径模块
const webpack = require("webpack");                             // 引入webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');       // html 插件
const {CleanWebpackPlugin} = require("clean-webpack-plugin");   // 清除目录等
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const glob = require('glob');

function getEntry() {
    let entry = {};
    entry['main'] = path.resolve(__dirname,'../src/renderer/main.js');
    //读取src目录所有page入口
    glob.sync('./src/renderer/views/**/*.js')
        .forEach(function (name) {
            // console.log(name);
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/')); //保存各个组件的入口
            n = n.split('views/')[1];
            // console.log(n);
            eArr.push(name);
            entry[n] = eArr;
        });
    // console.log(path.resolve(__dirname,'../src/main.js'));
    // console.log(entry);
    return entry;
}

module.exports = {
    entry: path.resolve(__dirname,'../src/renderer/main.js'),
    output: {
        path: path.resolve(__dirname, '../build/renderer'),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/,
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
            template: path.resolve(__dirname,'../src/renderer/views/index.ejs')
        }),
        //删除dist目录
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/main'), // 不打包直接输出的文件
                to: '../main', // 打包后静态文件放置位置
                ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            },
            {
                from: path.resolve(__dirname, '../src/renderer/lib/tinymce'), // 不打包直接输出的文件
                to: './lib/tinymce/'
            },
        ]),
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: 'css/[name].css',
            // chunkFilename:'css/[name].css',
        }),

    ],
    optimization: {
        splitChunks: {
            // chunks: 'all',
            // minSize: 30000,
            // name:true,
            // minSize: 30,  //提取出的chunk的最小大小
            cacheGroups: {
                /*******************css优化******************************/
                // styles: {
                //     name: 'styles',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     enforce: true,
                // },
                style: {
                    name: 'style' ,  // 提取出来的文件命名
                    // name： ‘common/common’ //  即先生成common文件夹
                    //chunks: 'initial',   // initial表示提取入口文件的公共css及
                    // chunks: 'all' // 提取所有文件的公共部分
                    test: '/\.css$/',  // 只提取公共css ，命名可改styles
                    minChunks:1, // 表示提取公共部分最少的文件数
                    minSize: 0  // 表示提取公共部分最小的大小
                    // 如果发现页面中未引用公共文件，加上enforce: true
                }
            }
        },
    }
};