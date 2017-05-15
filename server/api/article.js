const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('article')
const { tArticle } = require("../db/connect")

//文章列表

router.get('/lists', async (req, res, next) => {
    const {pageIndex=0,pageSize=20} = req.query
    const articleLists = await tArticle.find({approve:true})
                                       .skip(pageIndex)
                                       .limit(pageSize)
    res.send({
        list:articleLists
    })
})

//文章排行榜
router.get('/ranking', async (req,res,next)=>{
    const {type="like"} = req.query
    const data = await tArticle.find({approve:true},{title:1,like:1,pageView:1}).sort({[type]:-1}).limit(5)
    res.send({
        rankingData:data
    })
})

module.exports = router