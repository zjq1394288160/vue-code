const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/, // 不打包node_modules里的内容
                include: [resolve('src')] // 打包src文件夹下的内容
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader','css-loader','sass-loader'],
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]'
                    }
                },
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                include: [resolve('src')]
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
    ]
}