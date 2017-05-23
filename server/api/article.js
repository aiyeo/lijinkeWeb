const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('article')
const { tArticle } = require("../db/connect")
const momnet = require("moment")
const sendEmail = require("../utils/sendEmai")

//文章列表

router.get('/lists', async (req, res, next) => {
    const { pageIndex = 0, pageSize = 20 } = req.query
    const articleLists = await tArticle.find({ approve: true })
        .skip(pageIndex)
        .limit(pageSize)
    res.send({
        list: articleLists
    })
    debug('获取文章列表成功')
})

//文章排行榜
router.get('/ranking', async (req, res, next) => {
    const { type = "like" } = req.query
    debug(`[排行榜Type:]${type}`);
    const data = await tArticle.find({ approve: true }, { title: 1, like: 1, pageView: 1 })
        .sort({[type]:-1})
        .limit(5)
    res.send({
        rankingData: data
    })
    debug('获取文章排行成功')
})

//新增文章

router.post("/add-article", (req, res, next) => {
    // 这里express 解析不了 fetch 的body 有问题 body是 "" console.log(req.body); 
    // 这里用原生 的 on('data')  来解析   Buffer
    let postData = ""
    req.on("data",(data)=>{
        postData +=data
    })
    req.on('end', async () => {
        const {
            editTitle,
            editAuthor,
            editContent,
            publishDate,
            editEmail,
            pageView,
            like,
            approve,
            editCategory
        } = JSON.parse(postData)
        debug('[client body]: ',postData)

        // tArticle.insertMany
        const data = await tArticle.create(
            {
                title:editTitle,
                content:editContent,
                author:editAuthor || "佚名",
                publishDate:momnet(publishDate).format("YYYY-MM-DD HH:mm:ss"),
                pageView:pageView,
                like:like,
                approve:approve,
                email:editEmail,
                category:editCategory
            }
        )
        debug('新增文章成功')
        res.send({success: 1})
    })
})


//获取文章详情
/**
 * parmas {articleId}  String
 */
router.post("/articleDetail", (req, res, next) => {
    let postData = ""
    req.on("data",(data)=>{
        postData +=data
    })
    req.on('end',async ()=>{
        const { articleId} = postData
        debug( '【articleId】',articleId)
        const articleDetail = (await tArticle.find({ _id: articleId })) || []
        res.send({
            articleDetail
        })
        debug('获取文章详情成功')
    })
})


//TODO 接口有问题
router.post('/addPageView',async (req,res,next)=>{
    let postData = ""
    req.on("data",(data)=>{
        postData +=data
    })
    req.on('end',async ()=>{
        const { articleId ,countTime} = postData
        debug( '【articleId】',articleId,'【countTime】',countTime)
        const pageView = (await tArticle.find({_id:articleId},{pageView:1}))[0].pageView
        const articleDetail = await tArticle.update({ _id: articleId },{$set:{'pageView':++pageView}})
        res.send({
            success:1
        })
        debug('[浏览量 pv +1]')
    })
})


module.exports = router