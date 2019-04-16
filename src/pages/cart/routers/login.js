const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
	let {username,password} = ctx.request.body;
    let mongores = await db.find('user',{username,password});
    //查找是否存在该用户
    let res;
    if (mongores.length) {
    	res = {
	    	code : 1,
	    	msg : '存在当前用户',
	    	count : mongores.length,
	    	data: {}
	    };
    }else{
    	res={
	    	code : 0,
	    	msg : '登录信息有误',
	    	count : mongores.length,
	    	data: {}
	    };
    }
    ctx.body = res;//把结果传给前台渲染
})

module.exports = router;