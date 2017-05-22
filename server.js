//依赖
const express = require('express')
const path = require("path")
const debug = require('debug')('server')
const bodyParser = require('body-parser')
const app = express()
const http = require("http").createServer(app)
const fs = require('fs')
const cors = require('cors')
const writeIndex = require('./server/utils/writeIndex')
const {PORT} = require("./config")
// const mode = process.env.NODE_ENV || "DEV"

// const webpack = require('webpack')
// const webpackConfig = require("./webpack.config")
// const compiler = webpack(webpackConfig)

// app.use(require("webpack-dev-middleware")(compiler,{
//     publicPath:devServerConfig.output.publicPath,
//     noInfo:true,
//     stats:{
//         colors:true
//     }
// }))
// app.use(require("webpack-hot-middleware")(compiler,{
//     log:console.log,
//     path:"/__webpack_hmr"
// }))
// if (mode === "DEV") {
// }




//中间键部分
app.use(express.static(`${__dirname}/public`));
// 转换 application/json
app.use(bodyParser.json())
// 转换 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// app.use(bodyParser.json())
app.use(cors())
//将打包的dist/index.html  写入到  public/index.html
writeIndex();
//端口启动部分
app.set('port', process.env.PORT || PORT);
const port = app.get('port')
//路由
app.get("/", (req, res, next) => {
    debug("PortalApp start");
    next();
})

//api部分
require("./server/api/talk")
app.use('/music', require("./server/api/music"))
app.use('/article', require("./server/api/article"))
app.use('/excel', require("./server/api/excel"))

const serverRuningInfo = `
    =============== [ My React App ] ===============
    =============== [ lijinke house ] ================
    =============== [ port : ${port} ] ============== 
                        :)
`
http.listen(port, () => debug(serverRuningInfo))

module.exports = http

