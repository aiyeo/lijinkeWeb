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
    debug(`[排行榜Type:]${type}`);
    const data = await tArticle.find({ approve: true }, { title: 1, like: 1, pageView: 1 })
        .sort({ [type]: -1 })
        .limit(5)
    res.send({
        rankingData: data
    })
    debug('获取文章排行成功')
})

//新增文章

router.post("/add-article", async (req, res, next) => {
    const {
        editTitle,
        editAuthor,
        editContent,
        publishDate,
        editEmail = config.adminEmail,
        pageView,
        like,
        approve,
        editCategory
        } = req.body
    debug('[client body]: ', req.body)

    // tArticle.insertMany
    const data = await tArticle.create(
        {
            title: editTitle,
            content: editContent,
            author: editAuthor || "佚名",
            publishDate: publishDate,
            pageView: pageView,
            like: like,
            approve: approve,
            email: editEmail,
            category: editCategory
        }
    )
    debug('新增文章成功')
    res.send({ success: 1 })
})


//获取文章详情
/**
 * parmas {articleId}  String    文章id
 */
router.post("/articleDetail", async (req, res, next) => {
    const { articleId } = req.body
    debug('【articleId】', articleId)
    const articleDetail = (await tArticle.find({ _id: articleId }))[0] || []
    res.send({
        articleDetail
    })
    debug('获取文章详情成功')
})

/**
 * 文章浏览量
 * parmas {articleId} String 文章id
 */
router.post('/addPageView', async (req, res, next) => {
    const { articleId } = req.body
    let pageView = (await tArticle.find({ _id: articleId }, { pageView: 1 }))[0].pageView
    debug('【articleId】', articleId, '【pageView】:',pageView)
    const articleDetail = await tArticle.update({ _id: articleId }, { $set: { pageView:++pageView} })
    res.send({
        success: 1
    })
    debug('[浏览量 pv +1]')
})

/**
 * 点赞
 * @parmas {isLike} Boolean  点赞 true or 取消赞 false
 * @parmas {id}  String  文章id
 */
router.post("/toggleLike", async (req,res,next)=>{
    const {isLike,id} = req.body
    debug('[喜欢]:',isLike)
    let likeNum = (await tArticle.find({ _id: id }, { like: 1 }))[0].like

    if(isLike === true){
        likeNum ++
    }else if(isLike === false){
        likeNum --
    }
    debug('喜欢量',likeNum)
    const data = await tArticle.update({ _id: id }, { $set: { like:likeNum} })
    debug('[喜欢点赞成功]')
    res.send({
        success:1
    })
})


module.exports = router