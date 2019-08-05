const path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
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
                exclude: /node_modules/,
                include: [resolve('src')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
                include: [resolve('src')]
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
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    devServer: {
        port: 9999,
        open: true,
        overlay: {
            errors: true // 如果在webpack编译的过程中有任何的错误直接输出到页面上
        }
    }
}