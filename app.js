/** 
 * 服务器启动文件
 */
const Koa = require('koa');
const koaBody = require('koa-body')
const convert = require('koa-convert')
const views = require('koa-views')
const static = require('koa-static')
const logger = require('koa-logger')
const cros = require('koa2-cors');
const jwtKoa = require('koa-jwt');
const auth= require('./middlewares/auth')
const path = require('path')

const app = new Koa()
//全局配置
const config = require('./config')

const routers = require('./routers/index')

//允许跨域
app.use(cros())
//控制台打印中间件
app.use(convert(logger()))
//post请求解析中间件
app.use(koaBody())
//访问静态文件夹中间件
app.use(convert(static(path.join(__dirname, './static'))))
//验证token
app.use(auth)
//token 生成token,login和reg不需要验证
app.use(convert(jwtKoa({
    secret: config.secret
}).unless({
    path: [/^\/api\/post\/user\/login/, /^\/api\/post\/user\/reg/]
})))

//路由挂载
app.use(routers.routes(), routers.allowedMethods())
app.listen(config.port, () => {
    console.log(`server is start at port ${config.port}`)
})