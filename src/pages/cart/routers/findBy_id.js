const Router = require('koa-router');

const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
	let {username} = ctx.request.body;
    let mongores = await db.find('user',{username});
    //查找是否存在该用户
    let res;
    if (mongores.length) {
    	res = {
	    	code : 1,
	    	msg : '存在当前用户',
	    	count : mongores.length,
	    	data: mongores
	    };
    }else{
    	res={
	    	code : 0,
	    	msg : '不存在当前用户',
	    	count : mongores.length,
	    	data: mongores
	    };
    }
    ctx.body = res;//把结果传给前台渲染
})

module.exports = router;