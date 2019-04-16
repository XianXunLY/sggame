const Router = require('koa-router');
const db = require('../db');

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post('/',async (ctx,next)=>{
	console.log(ctx.request.body);
	let {username,logins,sex,birth,psw,email,phonenumber,introduce} = ctx.request.body;
	console.log({username,logins,sex,birth,psw,email,phonenumber,introduce});
    let mongores = await db.insert('user',{username,logins,sex,birth,psw,email,phonenumber,introduce});
    //处理数据分页渲染
    let res1 = {
    	code : 0,
    	msg : '成功添加用户',
    	count : mongores.length,
    	data:''
    };
    ctx.body = res1;//把结果传给前台渲染
})

module.exports = router;