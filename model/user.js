/** 
 * 数据库操作,增删改查
 */
const mysql = require('./../mysql/mysql')

const user = {
     /** 
      * 注册
      * @param {Object} option 用户数据
      * @return {object||null} 查询的数据 
      */
     async reg(option) {
          let sql = `SELECT * from user_info where username=${option.username} or password=${option.password} limit 1`
          console.log(option)
          let result = await mysql.query(sql)
          console.log(result.length)
          console.log(Array.isArray(result))
          if (Array.isArray(result) && result.length > 0) {
               result = result[0]
          } else {
               result = null
          }
          return result
     },
     /** 
      * 创建
      */
     async create(option) {
          let result = mysql.insertData('user_info', option)
          return result;
     },
     /** 
      * 登陆
      * @param {object} 用户名
      * @return {object||null} 返回值
      */
     async login(option) {
          let sql = `SELECT * from user_info where username=${option.username}  limit 1`
          let result = await mysql.query(sql)
          if (result.length > 0) {
               result = result[0]
          } else {
               result = null
          }
          return result
     },
     /** 
      * 获取用户列表
     */
    async getUserList(){
         let sql=`SELECT * from user_info`
         let result=await mysql.query(sql)
         let arr=[]
         for(let i of result){
              //删除密码
               delete i['password']
               delete i['id']
               arr.push(i)
         }
         return arr
    }
}
module.exports = user;