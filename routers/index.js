/** 
 * 路由汇总
*/
const router=require('koa-router')()
const user=require('./user')

//user 模块
router.use(user.routes(),user.allowedMethods())

//导出路由
module.exports=router