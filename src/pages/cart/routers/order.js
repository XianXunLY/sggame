const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.get('/',async (ctx,next)=>{
	//获取前端传过来的页码page和页容量limit
	console.log('order',ctx.request.params);
//	let {username} = ctx.request.params;
    let mongores = await db.find('gameOrder', {host:'sonkwo'});
    //处理数据分页渲染
    let res1 = {
    	code : 0,
    	msg : '购物车数据',
    	count : mongores.length,
    	data:mongores
    };
    ctx.body = res1;//把结果传给前台渲染
})

module.exports = router;