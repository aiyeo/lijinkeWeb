module.exports = function(req, res, next) {
    let postData = ""
    req.on('data', (data) => {
        postData += data
    })
    req.on('end', () => {
        postData = postData && JSON.parse(postData)
        req.body =  Object.assign(req.body,postData)
        next()
    })
}