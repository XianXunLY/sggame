const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
// 创建路由
var router = new Router(); 

// 引入页面路由
const findByidRouter = require('./findBy_id');//修改之前要查询根据_id信息
const orderRouter = require('./order');//返回订单信息
const orderUpdataRouter = require('./orderUpdata');//修改订单信息
const regRouter = require('./reg');//修改订单信息
const loginRouter = require('./login');//修改订单信息

router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
        }
    }
}));


router.use('/find',findByidRouter.routes());
router.use('/cart/shop',orderRouter.routes());
router.use('/orderUpdata',orderUpdataRouter.routes());
router.use('/reg',regRouter.routes());
router.use('/login',loginRouter.routes());

module.exports = router;