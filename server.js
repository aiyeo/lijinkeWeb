//依赖
const express = require('express')
const path = require("path")
const debug = require('debug')('server')
const bodyParser = require('body-parser')
const compression = require("compression")
const app = express()
const http = require("http").createServer(app)
const fs = require('fs')
const cors = require('cors')
const writeIndex = require('./server/utils/writeIndex')
const getFetchData = require('./server/middleware/getFetchData')
const { PORT } = require("./config")
const mode = process.env.NODE_ENV || "DEV"


//中间键部分
app.use(express.static(`${__dirname}/public`));
// 转换 application/json
// app.use(compression())         //GZIP 压缩
// app.use(bodyParser.json())
// 转换 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(getFetchData)

//将打包的dist/index.html  写入到  public/index.html
writeIndex();
//端口启动部分
app.set('port', process.env.PORT || PORT);
const port = app.get('port')
//路由
app.get("/", (req, res, next) => {
    console.log(helper.getClientIp(req));
    debug("PortalApp start");
    next();
})

//api部分
require("./server/api/talk")
app.use('/music', require("./server/api/music"))
app.use('/article', require("./server/api/article"))
app.use('/excel', require("./server/api/excel"))
app.use('/admin', require("./server/api/admin"))

const serverRuningInfo = `
    =============== [ My React App ] ===============
    =============== [ lijinke house ] ================
    =============== [ port : ${port} ] ============== 
    =============== [ mode : ${mode} ] ============== 
                        :)
`
http.listen(
    port, 
    () => mode === "DEV" 
        ? debug(serverRuningInfo) 
        : console.log(serverRuningInfo)
)

module.exports = http

