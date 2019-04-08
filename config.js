/** 
 * 项目配置文件
*/
const config={
    //端口好配置
    port:3000,  

    //数据库基本配置
    database:{
        USER:'root',
        PASSWORD:'123456',
        HOST:"localhost",
        DATABASE:'node'
    },
    //secret 是用于加密的密钥
    secret:"secret"
}
module.exports=config
