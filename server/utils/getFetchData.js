module.exports = {
    getFetchData(req){
        let res = ""
        res.on('data',(data)=>{
            res += data
        })
        res.on('end',async ()=>{
            res = await res.toString()
        })

        return res        
    }
}