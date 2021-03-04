/* 用于开发环境的webpack配置文件 */
const merge = require('webpack-merge')
const HappyPack = require("happypack"); // 多线程编译
const PUBLIC_PATH = "/"; // 基础路径
const webpack = require("webpack"); // webpack核心
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const baseWebpackConfig = require('./webpack.base.config')
const {resolve} = require('./utils')
const utils = require('./utils')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: [
      "webpack-hot-middleware/client?reload=true&path=/__webpack_hmr", // webpack热更新插件，就这么写
      "./src/index.js", // 项目入口
    ],
    output: {
        path: __dirname + "/", // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
        publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
        filename: "bundle-[contenthash].js", // 编译后的文件名字
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                // 编译前通过eslint检查代码 (注释掉即可取消eslint检测)
                test: /\.js?$/,
                enforce: "pre",
                use: ['eslint-loader'],
                include: resolve('src'),
              },
              {
                // .js .jsx用babel解析
                test: /\.js?$/,
                use: ['happypack/loader'],
                include: resolve('src'),
              },
        ].concat(utils.styleLoaders({
            sourceMap: true,
            extract: false,
            usePostCSS: true
        }))
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": "dev",
        }),
        new HtmlWebpackPlugin({
            // 根据模板插入css/js等生成最终HTML
            filename: "index.html", //生成的html存放路径，相对于 output.path
            favicon: "./public/favicon.png", // 自动把根目录下的favicon.ico图片加入html
            template: "./public/index.html", //html模板路径
            inject: true, // 是否将js放在body的末尾
          }),
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new HappyPack({
            loaders: ["babel-loader"],
        }),
    ]

})