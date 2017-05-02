const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const {host:HOST,port:PORT,staticPath} = config

router.get('/',(req,res,next)=>{
   const musicFile =  fs.readdirSync(`${staticPath}/music`)
   res.send({
       src:`${HOST}:${PORT}/music/${musicFile[0]}`
   })
   next();
})


module.exports = router;