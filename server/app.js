//依赖
const express = require('express')
const path = require("path")
const debug = require('debug')('app')
const bodyParser = require('body-parser')
const app = express()
const http = require("http").createServer(app)
const cors = require('cors')
const cookieParser = require('cookie-parser')
const writeIndex = require('./utils/writeIndex')
const logger = require('../server/middleware/logger')
const timeOut = require('connect-timeout')
const { PORT } = require("../config")
const mode = process.env.NODE_ENV || "DEV"


//中间键部分
app.use(express.static(`${__dirname}/../public`));      //设置静态资源目录
app.use(bodyParser.urlencoded({ extended: false })) // 转换 application/x-www-form-urlencoded
app.use(cookieParser()) //cookie
app.use(cors())        //跨域
app.use(logger)       //日志
app.use(require('./middleware/getFetchData'))  //转换fetch 过来的body   添加到 req.body


//将打包的dist/index.html  写入到  public/index.html
writeIndex();


//api部分
//接口 统一 res.data = xxx   apiHandler中间键统一处理包装
require("./api/talk")
app.use("/api",timeOut("10s"))
app.use('/api/music', require("./api/music"))
app.use('/api/article', require("./api/article"))
app.use('/api/admin', require("./api/admin"))


app.use(require('./middleware/apiHandler'))    //统一包装接口返回结果 res.data = xxx 
app.use(require('./middleware/errorHandler'))    //错误处理

//端口启动部分
app.set('port', process.env.PORT || PORT);
const port = app.get('port')

const serverRuningInfo = `
    =============== [ My React App ] ===============
    =============== [ lijinke house ] ================
    =============== [ port : ${port} ] ============== 
    =============== [ mode : ${mode} ] ============== 
                        :)
`
http.listen(port, debug(serverRuningInfo))

module.exports = http

