/** 
 * 连接数据与操作
 */
const userModel = require('./../model/user')
const user = {
    /** 
     * 注册
     */
    async reg(option) {
        let result = await userModel.reg({
            'username': option.username,
            'password': option.password
        })
        return result
    },
    /** 
     * 创建用户
     */
    async create(option) {
        let result = await userModel.create(option)
        console.log(result)
        return result
    },
    /** 
     * 登陆
     */
    async login(option) {
        let result = await userModel.login(option)
        console.log(result)
        return result
    },
    /** 
     * 获取用户列表
    */
   async getUserList(){
       let result=await userModel.getUserList()
       return result
   }
}
module.exports = user