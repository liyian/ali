
// ---------server with ssl -------------------//
// const Koa = require('koa')
// const config = require('./config')
// const bodyParser = require('koa-bodyparser')
// const https = require('https')
// const fs = require('fs')
// const enforceHttps = require('koa-sslify')
// const http = require('http')

// const app = new Koa()

// app.use(enforceHttps.default())
// app.use(bodyParser())

// const router = require('./routes')
// app.use(router.routes())

// const options = {
//     key: fs.readFileSync('./4398442_www.edflabschina.cn.key'),
//     cert: fs.readFileSync('./4398442_www.edflabschina.cn.pem')
// };
// https.createServer(options, app.callback()).listen(5758)
// console.log(`server is started`)

// //--------local -------------------------//
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 解析请求体
app.use(bodyParser())

const router = require('./routes')
app.use(router.routes())

app.listen(config.port, () => {
  console.log(`server is started at port ${config.port}`)
})
