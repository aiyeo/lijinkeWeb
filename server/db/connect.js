const mongoose = require('mongoose')
const debug = require('debug')('connect-db')
const { db_path } = require('../../config')
const { musicSchema, articleSchema } = require("./schema")

mongoose.connect(db_path)

const db = mongoose.connection

db.on('open', () => { debug('mongose 连接成功') })

db.on('error', (e) => { debug(`[errr] : 连接失败 ${e}`) })

const tMusic = mongoose.model('music', musicSchema)
const tArticle = mongoose.model('article', articleSchema)

module.exports = {
    tMusic,
    tArticle
}