const mongoose = require('mongoose')
const debug = require('debug')('music-schema')

const musicSchema = new mongoose.Schema({
    id: String,             //音乐id
    name: String,           //音乐名
    src: String,            //路径
    imgSrc: String          //图片路径
}, {
        collection: "music"
    })

const articleSchema = new mongoose.Schema({
    id: String,              //文章id
    title: String,           //文章标题
    content: String,          //文章内容
    author: String,           //作者
    publishDate: {            //发表日期
        type:Date,
        dafault:Date.now
    },        
    pageView: String,         //点击量
    like: String,             //喜欢数量
    approve:Boolean           //是否审核通过
}, {
        collection: "article",
        timestamps: { createdAt: 'publishDate' }
    })

module.exports = {
    musicSchema,
    articleSchema
}