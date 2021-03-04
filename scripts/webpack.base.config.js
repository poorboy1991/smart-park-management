/* 提取公共的baseConfig */
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 用于直接复制public中的文件到打包的最终文件夹中
const HappyPack = require("happypack"); // 多线程编译
const webpackbar = require("webpackbar");
const webpack = require("webpack"); // webpack核心
const path = require('path')
const {resolve} = require('./utils')

// const NODE_ENV = process.env.mode
// let env = ''
// switch (NODE_ENV) {
//     case 'production':
//         env = {NODE_ENV: 'production'}
//         break
//     case 'testing':
//         env = {NODE_ENV: 'testing'}
//         break
//     case 'preview':
//         env = {NODE_ENV: 'preview'}
//         break
//     default:
//         env = {NODE_ENV: 'development'}
// }
console.log(process.env.mode, 'process.env.mode')

module.exports = {
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css", ".wasm"], // 后缀名自动补全
        alias: {
            "@": resolve('src'),
        },
    },
    module: {
        rules: [
            {
                // 文件解析
                test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                include: resolve('src'),
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: "assets/[name].[hash:4].[ext]",
                    },
                  },
                ],
              },
              {
                // 图片解析
                test: /\.(png|jpg|jpeg|gif)$/i,
                include: resolve('src'),
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      limit: 8192,
                      name: "assets/[name].[hash:4].[ext]",
                    },
                  },
                ],
              },
              {
                // wasm文件解析
                test: /\.wasm$/,
                include: resolve('src'),
                type: "webassembly/experimental",
              },
              {
                // xml文件解析
                test: /\.xml$/,
                include: resolve('src'),
                use: ["xml-loader"],
              },
        ]
    },
    plugins: [
        new webpackbar(),
        new AntdDayjsWebpackPlugin(), // dayjs 替代 momentjs

        new HappyPack({
          loaders: ["babel-loader"],
        }),
        // 拷贝public中的文件到最终打包文件夹里
        new CopyPlugin({
          patterns: [
            {
              from: "./public/**/*",
              to: "./",
              globOptions: {
                ignore: ["**/favicon.png", "**/index.html"],
              },
              noErrorOnMissing: true,
            },
          ],
        }),
    ]
}