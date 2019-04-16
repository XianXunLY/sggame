const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	devServer: {
		proxy: {
			"/api/*": {
		        target: "https://www.sonkwo.com", ///api/v5/home.json
		        changeOrigin: true,
		        pathRewrite: {
		          "^/api": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
		        }
		  	},
		  	"/group/*": {//4
		        target: "https://www.sonkwo.com", ///api/v5/home.json
		        changeOrigin: true,
		        pathRewrite: {
		          "^/group": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
		        }
		  	},
		  	"/post/*": {//6
		        target: "https://www.sonkwo.com", ///api/v5/home.json
		        changeOrigin: true,
		        pathRewrite: {
		          "^/post": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
		        }
		  	},
			"/local/*": {
				target: "http://localhost:1811", //设置你调用的接口域名和端口号 别忘了加http
				changeOrigin: true,
				pathRewrite: {
					"^/local": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
				}
			}
		}
	}

};