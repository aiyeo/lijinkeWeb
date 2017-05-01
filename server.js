//依赖
const express = require('express')
const path = require("path")
const http = require('http')
const app = express()
const fs = require('fs')

//中间键部分
app.use(express.static(`${__dirname}/public`))
//跨域请求
app.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();
})

//路由
app.get("/",(req,res,next)=>{
    console.log("app start");
})
app.get('/getMusicSrc',(req,res,next)=>{
   const musicFile =  fs.readdirSync(`${__dirname}/public/music`)
   res.send(`${__dirname}/public/${musicFile[0]}`)
})
app.get('/test',(req,res)=>{
    res.send('2222')
})
//端口启动部分
app.set('port', process.env.PORT || 1996);
const port = app.get('port')

const serverRuningInfo = `
    =============== [ My React App ] ===============
    =============== [ lijinke house ] ================
    =============== [ port : ${port} ] ============== 
                        :)
`
http.createServer(app).listen(port,()=> console.log( serverRuningInfo) )
