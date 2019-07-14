let path = require('path')
let glob = require('glob')

//配置views多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		var tmp = entry.split('/').splice(-3);
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'main.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
			filename: tmp[1] + '.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/views/**?/*.html');

module.exports = {
	lintOnSave: false, // 关闭eslint
	publicPath: '/',  
	productionSourceMap: false,
	pages,
	devServer: { // dev-server相关配置
		index: '/', 
		open: true,
		port: 9966,
		hotOnly: false,
		proxy: { // dev-server设置代理
			'/mobile': {
				target: `https://xxxxxx.cn`,
				changeOrigin: true,
				pathRewrite: {
					'^/mobile': ''
				}
			},
        },
        before(app) { // 添加中间件
			app.get('/', (req, res, next) => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});// 添加响应头，防止中文乱码
				for(let i in pages){ // 配置多页应用入口页面（循环每个页面，显示在入口页面上）
                    let pageName = pages[i].filename;
					res.write(`<div>点击去往 <a href="/${pageName}"> ${pageName}</a></div> </br>`);
				}
				res.end()
			})
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{  // 单独打包css
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	}
}
