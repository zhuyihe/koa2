/** 
 * 公共函数
 */
//引入加密算法
const bcrypt=require('bcrypt');
const common = {
    /** 
     * 格式化时间
     * @param {String} 'yyyy-MM-dd hh:mm:ss' 时间格式
     * @param {Date} 时间
     * @return {Date} 时间
     */
    dateFtt(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1, //月份   
            "d+": date.getDate(), //日   
            "h+": date.getHours(), //小时   
            "m+": date.getMinutes(), //分   
            "s+": date.getSeconds(), //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /** 
     * 生成hash值
     * @param {String} password 加密的文本
     * @param {number} strengh  加密强度
     * @return {String} 返回hash值
    */
     getHash(password,strength=10){
        let hash= bcrypt.hashSync(password,strength)
        return hash
    },
    /** 
     * hash值比较
     * @param {Sting} password 对比的密码
     * @param {Sting} hash 对比的hash值
     * @return {Boolean} 返回结果
    */
    compareHash(password,hash){
        let result=bcrypt.compareSync(password,hash)
        return result
    }

}
module.exports = common