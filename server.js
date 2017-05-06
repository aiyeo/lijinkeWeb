//依赖
const express = require('express')
const path = require("path")
const http = require('http')
const app = express()
const fs = require('fs')
const cors = require('cors')
const writeIndex = require('./server/utils/writeIndex')

//中间键部分
app.use(express.static(`${__dirname}/public`));
app.use(cors())
//将打包的dist/index.html  写入到  public/index.html
writeIndex();
//端口启动部分
app.set('port', process.env.PORT || 1996);
const port = app.get('port')
//路由
app.get("/",(req,res,next)=>{
    console.log("PortalApp start");
    next();
})
app.use('/music',require("./server/api/music"))

const serverRuningInfo = `
    =============== [ My React App ] ===============
    =============== [ lijinke house ] ================
    =============== [ port : ${port} ] ============== 
                        :)
`
http.createServer(app).listen(port,()=> console.log( serverRuningInfo) )
