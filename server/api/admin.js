const express = require('express')
const router = express.Router()
const fs = require("fs")
const debug = require('debug')('admin')
const moment = require('moment')
const { tArticle } = require("../db/connect")
const { host, port, staticPath, tableFields, companyName,adminEmail } = require("../../config")
const sendEmail = require("../utils/sendEmail")

//获取文章列表
router.get('/articleList', async (req, res, next) => {
    const data = await tArticle.find({})
    res.send({ data })
})

/**
 * 审核文章
 * @params {id}  String 文章id
 * @params {title}  String 文章标题
 * @params {email}  String 作者邮箱
 * @params {publishDate}  String 发表日期
 */
router.post('/approve', async (req, res, next) => {

    const { id, title, publishDate, email=adminEmail } = req.body
    debug(`[文章审核]: id :${id}, 标题:${title} 邮箱:${email} 日期: ${publishDate}`)
    const date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
    await tArticle.update({ _id: id }, { $set: { approve: true } })
    debug('文章审核成功!')
    await sendEmail.sendEmail({
        to: email,
        subject: `【${companyName}】文章审核通过通知!`,
        html: `<h3 style="font-weight:500;">您于 ${date} 发表的文章【${title}】已审核通过,请前往<a href="${host}">${companyName}</a>查看~</h3>`
    })
    res.send({
        success:1
    })
    debug('[文章审核通过,邮箱发送成功] 收件人:', email)

})

module.exports = router
