'use strict';
const express = require('express');
var proxy = require('http-proxy-middleware');
const qs = require('querystring');
const urlpg = require('url');
let app = express();

app.use(express.static('./'))

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	req.header('Accept', 'application/vnd.sonkwo.v6+json');
	// 跨域请求CORS中的预请求
	if(req.method == "OPTIONS") {
		res.sendStatus(200); /*让options请求快速返回*/
	} else {
		next();
	}
});

// local:  http://localhost:1811/jxapi/m_v1/statics/getzx.htm
// -> https://m.jiuxian.com/jxapi/m_v1/statics/getzx.htm
// target: https://m.jiuxian.com/m_v1/statics/getzx.htm
let url = "https://www.sonkwo.com/api/"; //网址
let param = ''; //参数拼接
let transformName = ''; //转化地址
var allUrl = '';

//posts贴子信息请求
app.use('/api/*', proxy({
	"target": "https://www.sonkwo.com", ///api/v5/home.json
	"changeOrigin": true,
	"pathRewrite": {
		"/api": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
	},
	"headers": {
		"Accept": "application/vnd.sonkwo.v5+json"
	}
}));
app.use('/group/*', proxy({
	"target": "https://www.sonkwo.com", ///api/v5/home.json
	"changeOrigin": true,
	"pathRewrite": {
		"/group": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
	},
	"headers": {
		"Accept": "application/vnd.sonkwo.v4+json"
	}
}));
app.use('/post/*', proxy({
	"target": "https://www.sonkwo.com", ///api/v6/home.json
	"changeOrigin": true,
	"pathRewrite": {
		"/post": "/api" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
	},
	"headers": {
		"Accept": "application/vnd.sonkwo.v6+json"
	}
}));

//数据库
app.use('/local/*', proxy({
	target: "http://localhost:1811", //设置你调用的接口域名和端口号 别忘了加http
	changeOrigin: true,
	pathRewrite: {
		"^/local": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
	},
	"headers": {
		"Accept": "application/vnd.sonkwo.v6+json"
	}
}));

app.listen('5000', function() {
	console.log('Server running on http://localhost:' + 5000);
});