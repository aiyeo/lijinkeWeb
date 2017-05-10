const http = require("http")
            .createServer(function(req, res){}).listen(8088),
        io = require("socket.io")(http),
        url = require("url") 

io.on("connection", function(socket){
    console.log("连接成功")
    
    socket.on("new massage",function(data){
        socket.broadcast.emit("new massage",data)
        socket.emit("new massage",data)
    })
})

function createIO(route){
    io.of(`/${route}`).on("connection", function(socket){
        console.log(`${route}连接成功`)
        socket.on("new massage",function(data){
            socket.broadcast.emit("new massage",data)
            socket.emit("new massage",data)
        })
    })
}