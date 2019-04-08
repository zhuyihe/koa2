/** 
 *返回前端接口，用户操作
 */
const userService = require('./../service/user')
const commonFun = require('./../static/js/common')
const config = require('./../config');
//引入认证机制
const jsonwebtoken = require('jsonwebtoken')
module.exports = {
    async reg(ctx) {
        let formData = ctx.request.body
        // ctx.body = formData;
        let result = await userService.reg(formData);
        let msg = {
            err_code: 1,
            message: ''
        }
        if (result) {
            msg.message = '用户已存在'
        } else {
            if (formData.password === formData.comfirmPass) {
                let userData = {
                    // id: 0,
                    username: formData.username,
                    password: commonFun.getHash(formData.password),
                    nick: formData.nick,
                    detail_info: formData.detail_info,
                    create_time: commonFun.dateFtt("yyyy-MM-dd hh:mm:ss", new Date())
                }
                let userCreate = await userService.create(userData)
                // 数据库运行成功
                if (userCreate.serverStatus == 2) {
                    msg.err_code = 0
                    msg.message = '用户注册成功'
                }
                console.log(userCreate)

            } else {
                msg.message = '两次密码不正确'
            }
        }
        ctx.body = msg
    },
    async login(ctx) {
        let formData = await userService.login(ctx.request.body)
        let msg = {
            err_code: 1,
            message: ''
        }
        if (formData == null) {
            msg.message = '用户不存在'
        } else {
            if (!commonFun.compareHash(ctx.request.body.password, formData.password)) {
                msg.message = '用户密码错误'
            } else {
                msg.err_code = 0
                msg.message = '登陆成功'
                msg.token = jsonwebtoken.sign({
                    data: formData,
                    // 设置 token 过期时间
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
                }, config.secret)
            }
        }
        ctx.body = msg
    },
    /** 
     * 获取用户列表
    */
    async getUserList(ctx) {
        let msg = {
            err_code: 1,
            message: '',
        }
        let result = await userService.getUserList();
        msg.err_code = 0
        msg.message = '获取成功'
        msg.data = result
        ctx.body = msg
    }
}