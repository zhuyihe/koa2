/** 
 * resful 用户路由汇总
 * */
const router = require('koa-router')()
//引入控制器模块
const userController = require('./../controllers/user')

//路由分配
const routers = router
    //登陆
    .post('/api/post/user/login', userController.login)
    //注册
    .post('/api/post/user/reg', userController.reg)
    //获取用户列表
    .get('/api/get/user/userList',userController.getUserList)

//导出
module.exports = routers;