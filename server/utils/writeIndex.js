const fs = require('fs')
const path = require('path')

module.exports = function(){
    const distIndexHtml = fs.readFileSync(path.resolve(__dirname,'../../public/static/index.html'))
    fs.writeFileSync(path.resolve(__dirname,'../../public/index.html'),distIndexHtml)
    console.log('写入index.html成功');
}