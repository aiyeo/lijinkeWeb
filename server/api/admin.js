const express = require('express')
const router = express.Router()
const fs = require("fs")
const debug = require('debug')('admin')
const moment = require('moment')
const { tArticle } = require("../db/connect")
const { host, port, staticPath, tableFields, companyName } = require("../../config")

router.get('/articleList',async (req,res,next)=>{
    const data = await tArticle.find({})
    res.send({data})
})

router.post('/approve',(req,res,next)=>{
    let postData = ""
    req.on('data',(data)=>{
        postData += data
    })
    req.on('end',async ()=>{
        const {id,title,publishDate} = postData
        const date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
        await tArticle.update({_id:id},{$set:{approve:true}})
        await sendEmail.sendEmail({
            to: "1359518268@qq.com",
            subject:`【${config.companyName}】文章审核通过通知!`,
            html: `<h2 style="font-weight:500;">您于 ${date} 发表的文章[${title}]已审核通过,请前往<a href="${host}">${companyName}</a>查看~</h2>`
        })
        debug('[文章审核通过,邮箱发送成功],收件人:',"aa")
    })

})

module.exports = router
