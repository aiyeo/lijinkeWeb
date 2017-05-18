const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('article')
const { tArticle } = require("../db/connect")
const momnet = require("moment")

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
    const data = await tArticle.find({ approve: true }, { title: 1, like: 1, pageView: 1 }, { sort: { [type]: -1 } }).limit(5)
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
            pageView,
            like,
            approve
        } = JSON.parse(postData)
        debug('[client body]: ',postData)
        //TODO 这里处理自增长 id 有点欠妥..
        const maxIds = (await tArticle.find({},{id:1}).sort({"id":-1}).limit(1))[0].id
        debug('[max Id 查找成功]: ',maxIds)
        // tArticle.insertMany
        const data = await tArticle.insertMany(
            {
                id:"11",
                title:editTitle,
                content:editContent,
                author:editAuthor,
                publishDate:momnet(publishDate).format("YYYY-MM-DD HH:mm:ss"),
                pageView:pageView,
                like:like,
                approve:approve,
                category:['测试插入数据']
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
router.get("articleDetail", async (req, res, next) => {
    const { articleId } = req.query
    const articleDetail = await tArticle.find({ id: articleId }, { _id: -1 }) || []
    res.send({
        articleDetail
    })
    debug('获取文章详情成功')
})

module.exports = router