//socket 服务器
const { socket_port } = require('../../config')
const debug = require('debug')('talk')
const http = require("http")
    .createServer(function (req, res) { }).listen(socket_port),
    io = require("socket.io")(http);

let onlineUsers = []        //在线用户
let onlineNumber = 0        //在线人数
let clientRanDomName = Date.now().toString(36)    //客户端随机显示的用户名

io.on("connection", function (socket) {
    debug("server socket 连接成功")
    // clientRanDomName ++
    socket.emit('login',{
        serverTime:new Date(),
        name:`吃瓜群众${clientRanDomName}`
    })
    socket.on('userJoin',(userInfo)=>{
        debug(`[ 用户 : ${userInfo.name} ] 加入聊天室, [ 用户id : ${userInfo.userId} ]`)
        if( ! onlineUsers.find((user)=> user.userId == userInfo.userId ) ){
            onlineUsers.push(userInfo)
            onlineNumber++
        }
        socket.emit('userJoin',{onlineNumber,userName:`吃瓜群众${clientRanDomName}`})
        debug(`[当前在线人数  : ${onlineNumber} ]`)

        socket.on('message',( messageInfo )=>{
            //向所有用户 推送当前消息
            socket.emit('message',messageInfo);
            debug('客户端发来消息=>',messageInfo)
        })
    })
})