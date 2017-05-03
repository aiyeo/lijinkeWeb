const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const {host:HOST,port:PORT,staticPath} = config

router.get('/',(req,res,next)=>{
   const musicFile =  fs.readdirSync(`${staticPath}/music`)
   const src = musicFile.find( item => /\.mp3/.test(item) )     //音乐文件路径
   const imageSrc = musicFile.find( item=> /.*\.(jpg|jpeg|gif|png)/.test(item) )  //图片路径
   const name = src.replace(/(.*)\.mp3/,'$1')       //音乐名字
   res.send({
       name,
       image:`${HOST}:${PORT}/music/${imageSrc}`,
       src:`${HOST}:${PORT}/music/${src}`
   })
   next();
})


module.exports = router;