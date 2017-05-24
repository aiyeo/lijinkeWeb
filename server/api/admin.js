const express = require('express')
const router = express.Router()
const fs = require("fs")
const debug = require('debug')('admin')
const moment = require('moment')
const { tArticle } = require("../db/connect")
const { host, port, staticPath, tableFields, companyName } = require("../../config")
const sendEmail = require("../utils/sendEmai")

router.get('/articleList',async (req,res,next)=>{
    const data = await tArticle.find({})
    res.send({data})
})

router.post('/approve',async (req,res,next)=>{
    let postData = ""
    req.on('data',(data)=>{
        postData += data
    })
    req.on('end',async ()=>{
        const {id,title,publishDate,email} = postData
        const date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
        await tArticle.update({_id:id},{$set:{approve:true}})
        debug('文章审核成功!')
        await sendEmail.sendEmail({
            to: email,
            subject:`【${companyName}】文章审核通过通知!`,
            html: `<h2 style="font-weight:500;">您于 ${date} 发表的文章[${title}]已审核通过,请前往<a href="${host}">${companyName}</a>查看~</h2>`
        })
        debug('[文章审核通过,邮箱发送成功] 收件人:',email)
    })

})

module.exports = router
