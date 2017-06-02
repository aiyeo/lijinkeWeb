const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('article')
const { tArticle,tComment } = require("../db/connect")
const momnet = require("moment")


/**
 * 文章列表
 * @param {pageIndex} 页码      default 1
 * @param {pageSize}  每页个数   default 3
 */

router.get('/lists', async (req, res, next) => {
    const { 
        pageIndex = 1, 
        pageSize = 3 
    } = req.query

    const articleLists = await tArticle.find({ approve: true })
                                        .skip( (pageIndex - 1) * pageSize )
                                        .limit(pageSize)
    res.send({
        list: articleLists
    })
    debug(`[获取文章列表成功],页码[${pageIndex}] 每页个数[${pageSize}]`)
})

/**
 * 获取文章排行榜
 * @param {type} String  文章分类
 */
router.get('/ranking', async (req, res, next) => {
    const { type = "like" } = req.query
    debug(`[排行榜Type:]${type}`);
    const data = await tArticle.find({ approve: true }, { _id:1,title: 1, like: 1, pageView: 1 })
        // .sort({ [type]: -1 })
        // .limit(5)
    const rankingData = data.sort((a,b)=> (~~a[type]) + (~~b[type]) ).slice(0,5)
    res.send({
        rankingData
    })
    debug('获取文章排行成功')
})

/**
 * 新增文章
 * @param {editTitle} String 标题
 * @param {editAuthor} String 作者
 * @param {editContent} String 内容
 * @param {publishDate} String 发表日期
 * @param {editEmail} String  作者邮箱
 * @param {pageView} String   pv
 * @param {like} String       点赞数
 * @param {approve} Boolean    是否通过审核
 * @param {editCategory} Array  分类
 */

router.post("/add-article", async (req, res, next) => {
    const {
        editTitle,
        editAuthor,
        editContent,
        publishDate,
        editEmail = config.adminEmail,
        pageView = "0",
        like = "0",
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


/**
 * 获取文章详情
 * @param {articleId}  String    文章id
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
 * @param {articleId} String 文章id
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
 * 文章点赞
 * @param {isLike} Boolean  点赞 true or 取消赞 false
 * @param {id}  String  文章id
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

/**
 * 评论点赞
 * @param {isLike} Boolean  点赞 true or 取消赞 false
 * @param {id}  String  评论id
 */
router.post("/toggle-commentLike", async (req,res,next)=>{
    const {isLike,id} = req.body
    debug('[点赞]:',isLike)
    let likeNum = (await tComment.find({ _id: id }, { like: 1 }))[0].like

    if(isLike === true){
        likeNum ++
    }else if(isLike === false){
        likeNum --
    }
    debug('评论点赞量',likeNum)
    const data = await tComment.update({ _id: id }, { $set: { like:likeNum} })
    debug('[评论点赞成功]')
    res.send({
        success:1
    })
})

/**
 * 获取评论列表
 * @param {articleId} String 文章id
 */
router.get('/comment-lists', async (req,res,next)=>{
    const {articleId} = req.query
    debug('[文章id]:',articleId)
    const commentLists = await tComment.find({articleId})
    res.send({
        success:1,
        commentLists
    })
    debug('评论列表查询成功!')
})

/**
 * 发表评论
 * @param {articleId} String   文章id
 * @param {commentName} String 姓名
 * @param {commentEmail} String 邮箱
 * @param {commentContent} String 评论内容
 */
router.post('/publish-comment', async (req,res,next)=>{
    const {
        articleId,
        commentName,
        commentEmail,
        commentContent,
        publishDate
    } = req.body

    debug('[文章评论]',req.body)
    
    const data = await tComment.create({
        articleId,
        commentName,
        commentEmail,
        commentContent,
        publishDate
    })
    debug('[文章评论成功]');
    res.send({success:1})
    
})

/**
 * 评论点赞
 * @param {isLike} Boolean  点赞 true or 取消赞 false
 * @param {id}  String  评论id
 */
router.post("/toggle-commentLike", async (req,res,next)=>{
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