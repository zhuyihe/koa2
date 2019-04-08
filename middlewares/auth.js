/** 
 * 验证token
 */
module.exports= function (ctx, next) {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status=401
            let result={
                err_code:401,
                message:'登陆过期'
            }
            // ctx.status = 401;
            ctx.body = result
        } else {
            throw err;
        }
    });
}
