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
    title: String,           //文章标题
    content: String,          //文章内容
    author: String,           //作者
    publishDate: {            //发表日期
        type:Date,
        dafault:Date.now
    },        
    pageView: String,         //点击量
    like: String,             //喜欢数量
    approve:Boolean,           //是否审核通过
    email:String,              //作者邮箱  用来通知作者文章是否通过
    category:Array
}, {
        collection: "article"
    })

const commentSchema = new mongoose.Schema({
        articleId:String,           //文章id
        commentName:String,         //姓名
        commentEmail:String,        //邮箱
        commentContent:String,      //内容
        like:String,                //点赞量
        publishDate:{               //发布日期
            type:Date,
            dafault:Date.now
        }          
},{
    collection:"comment"
})

module.exports = {
    musicSchema,
    articleSchema,
    commentSchema
}