const express = require('express')
const router = express.Router()
const config = require('../../config')
const fs = require("fs")
const debug = require('debug')('music')
const multiparty = require('multiparty')
const {host:HOST,port:PORT,staticPath} = config

router.get('/',(req,res,next)=>{

    const {name,imageSrc,src} = getMusicInfo(fs);
   res.send({
       name:name ? name : "",
       image:imageSrc ? `${HOST}${PORT}/music/${imageSrc}` : "",
       src: src ? `${HOST}${PORT}/music/${src}` :""
   })
   next();
})

function getMusicInfo(fs){
    const musicFile =  fs.readdirSync(`${staticPath}/music`)
    debug('音乐文件读取成功')
    const src = musicFile.find( item => /\.mp3/.test(item) )     //音乐文件路径
    const imageSrc = musicFile.find( item=> /.*\.(jpg|jpeg|gif|png)/.test(item) )  //图片路径
    const name = src && src.replace(/(.*)\.mp3/,'$1') || ""       //音乐名字
    debug(`[musicSrc]:${src}`)
   debug(`[musicImgSrc]:${imageSrc}`)
   debug(`[name]:${name}`)
    return {
        src,
        imageSrc,
        name
    }
}
//上传音乐
const fieldsConfig = {
    name:"audioName",
    img:"audioImg",
    file:"audioFile"
}
router.post('/uploadMusic',(req,res,next)=>{
    const form = new multiparty.Form();
    form.parse(req,( err,fields,files )=>{
        if(err) throw err
        //新音频文件
        const {name,src} = saveUploadAudio(files[fieldsConfig.file],fieldsConfig.file)
        //新音频图片
        const {imageSrc} = saveUploadAudio(files[fieldsConfig.img],fieldsConfig.img)
        res.send({
            success:1,
            data:{
                src:src &&  `${HOST}${PORT}/music/${src}` || "",
                name:name && name || "",
                imageSrc:imageSrc && `${HOST}${PORT}/music/${imageSrc}`|| ""
            }
        })
    })
})


function saveUploadAudio( files,fileType ){
    let fileData = {};
    if(files && files.length >=1){
        files.forEach((data,index)=>{
            const {originalFilename,path,size} = data
            let file = fs.readFileSync(path)
                        .toString()
                        .replace(/%/g, "%25")
                        .replace(/\&/g, "%26")
                        .replace(/\+/g, "%2B");
            switch (fileType) {
                case fieldsConfig['file']:
                    if(size == 0){
                        fileData.name = ""
                        fileData.src = ""
                        return        
                    }
                    const {name,src} = getMusicInfo(fs);
                    if(src){
                        fs.unlinkSync(`${staticPath}/music/${src}`)
                        debug(`删除${src}成功!`);   
                    }
                    let newMusicPath = `${staticPath}/music/${Date.now()}.mp3`
                    fs.writeFileSync(newMusicPath,file)
                    debug(`保存${originalFilename}成功`)
                    const {name:newName,src:newSrc} = getMusicInfo(fs);
                    fileData.name = originalFilename && originalFilename.replace(/(.*)\.mp3/,'$1') || "",
                    fileData.src = newSrc
    
                    break;
                case fieldsConfig['img']:
                    if(size == 0){
                        fileData.imageSrc = ""
                         return
                    }
                    const {imageSrc} = getMusicInfo(fs);
                    if(imageSrc){
                        fs.unlinkSync(`${staticPath}/music/${imageSrc}`)
                        debug(`删除${imageSrc}成功!`);
                    }
                    let newPath = `${staticPath}/music/${Date.now()}.${originalFilename.replace(/.*\.(jpg|jpeg|png)$/,'$1')}`
                    fs.writeFileSync(newPath,file)
                    debug(`保存${originalFilename}成功`)
                    const {imageSrc:newImageSrc} = getMusicInfo(fs);
                    fileData.imageSrc = newImageSrc
                    break;
                default:
                    debug('[error]:上传的音乐类型未知!')
                    throw new Error('[error]:上传的音乐类型未知!')
            }
        })
    }
    return fileData
}


module.exports = router;