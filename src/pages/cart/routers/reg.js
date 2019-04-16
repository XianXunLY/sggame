const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
	let {username,password,name} = ctx.request.body;
	var ObjectID = require('mongodb').ObjectID;
    let mongores = await db.find('user',{username});
    console.log('123reg');
    //查找是否存在该用户
    let res;
    if (mongores.length) {
    	res = {
	    	code : 1,
	    	msg : '用户已注册',
	    	count : mongores.length,
	    	data: {}
	    };
    }else{
    	let _mongores = await db.insert('user',{username,password,name});
    	res={
	    	code : 0,
	    	msg : '注册成功',
	    	count : mongores.length,
	    	data: {}
	    };
    }
    ctx.body = res;//把结果传给前台渲染
})

module.exports = router;