import React from 'react'
import Button from "shared/components/Button"
import "./styles.less"
import { host, socket_port,PORT } from "config"
import classNames from "classnames"
import io from "socket.io-client"

export default class Talk extends React.Component {
    constructor(props) {
        super(props)
        this.socket = null
        this.joinTipTime = 3000
        this.state = {
            isConnect: false,      //是否连接服务器成功
            messages: [],          //消息列表
            currentMessage: "",
            onlineNumber: 0,
            userName: "",
            isSelf: true,        //是否自己发的消息
            showTip:false,
        }
    }
    render() {
        const {
            isConnect,
            messages,
            currentMessage,
            onlineNumber,
            userName,
            isSelf,
            initSuccess,
            showTip
      } = this.state
        return (
            <div className="talk" key="talk">
                <div className="talk-header">
                    <h2>在线聊天室</h2>
                    <p>
                        <span className="num-content">当前在线人数 : <span key="userNum" className="userNum">{onlineNumber}</span>  </span>
                        <span className="name-content">用户名:<span key="username" className="username">{userName}</span></span>
                    </p>
                </div>
                <section className="talk-section">
                    {
                        showTip
                        ? <div className="user-join-tip">{userName}进入了房间</div>
                        : undefined
                    }
                    {
                        isConnect
                            ? <p className="init connect-success"><i className="icon icon-true "></i> 聊天室连接成功...</p>
                            : <p className="init"><i className="icon icon-liaotian"></i>连接中...</p>
                    }
                    {
                        isConnect
                            ? <ul key="talk-message-content">
                                {
                                    messages.map((item, i) => {
                                        let { message, time, name } = item
                                        return (
                                            <li key={i} className={
                                                classNames(
                                                    "pull-right", "message",
                                                    { "message-animte-right": isSelf ? true :false },
                                                    { "message-animte-left": isSelf ? false : true },
                                                )
                                            }>
                                                <p>{message}</p>
                                                <p>
                                                    <span className="message-info">{name}</span>
                                                    <span className="message-time">{time}</span>
                                                </p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            : <p>正在召唤李金珂...</p>
                    }
                </section>
                <div className="talk-btn talk-footer">
                    <input type="text" className="inp-message" placeholder="输入消息" onChange={this.saveMessage} />
                    {
                        currentMessage == ""
                            ? <Button key="disabledSend" className="btn-send" style={{ "border": "1px solid transparent" }}>发送</Button>
                            : <Button key="sendMessage" type="primary" className="btn-send" onClick={this.sendMessage}>发送</Button>
                    }
                </div>
            </div>
        )
    }
    //输入信息
    saveMessage = (e) => {
        this.setState({ currentMessage: e.target.value })
    }
    //发送消息
    sendMessage = () => {
        const date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            hh = h < 10 ? `0${h}` : h,
            mm = h < 10 ? `0${m}` : m,
            ss = h < 10 ? `0${s}` : s

        const currentTime = `${year}/${month}/${day} ${hh}:${mm}:${s}`   //当前时间
        const { currentMessage } = this.state
        this.socket.send({
            message: currentMessage,
            time: currentTime,
            userId: this.userId,
            name: this.name
        })

    }
    componentDidMount() {
        this.socket = io(`${host}:${socket_port}`)
        // //读取历史聊天记录
        // this.setState({
        //     messages: JSON.parse(localStorage.getItem("historyMessage")) || []
        // })
        this.listenUserJoin()
        this.listenMessage()
    }
    listenMessage = () => {
        this.socket.on('message', (messageInfo) => {
            console.info(`接收到服务端消息:${messageInfo}`);
            const messages = this.state.messages.concat(messageInfo)
            // messages.length >=1 &&  localStorage.setItem("historyMessage", JSON.stringify(messages))

            if(this.userId == messageInfo.userId){
                this.setState({
                     messages,
                     isSelf:true
                })
            }else{
                this.setState({
                    messages
                })
            }
        })
    }
    listenUserJoin = () => {
        this.socket.on('login', ({ serverTime, name }) => {
            this.setState({ isConnect: true })
            console.info(`[socket连接成功]:${serverTime}`);
            const userId = this.getUserId()
            
            this.socket.emit('userJoin', { userId, name })
            this.name = name
            this.userId = userId
            console.info(`[userId]:${userId}`)
            this.socket.on('userJoin', ({ onlineNumber, userName }) => {
                console.log(`[用户进入]:${userName} [在线人数]:${onlineNumber}`);
                this.setState({ onlineNumber, userName,showTip:true })
                setTimeout(()=>{
                    this.setState({showTip:false})
                },this.joinTipTime || 3000)
            })
        })
    }
    getUserId = () => {
        const userId = localStorage.getItem('userId') || this.createUserId()
        return userId
    }
    createUserId = () => {
        localStorage.setItem('userId', Date.now().toString(36))
        return localStorage.getItem('userId')
    }

}