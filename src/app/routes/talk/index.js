import React from 'react'
import ReactDOM from "react-dom"
import Button from "shared/components/Button"
import "./styles.less"
import { host, socket_port, PORT } from "config"
import classNames from "classnames"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import helper from "shared/libs/helper"
import io from "socket.io-client"
import Message from "shared/components/Message"

import userJoin from "./action"

@connect(
  ({ TalkAction }) => ({
    userName: TalkAction.userName
  }),
  (dispatch) => (
    bindActionCreators({
      userJoin
    }, dispatch)
  )
)
export default class Talk extends React.Component {
  constructor(props) {
    super(props)
    this.socket = null
    this.joinTipTime = 3000
    this.state = {
      isConnect: false, //是否连接服务器成功
      messages: [], //消息列表
      currentMessage: "",
      currentName: "",
      loginOutName: "",    //退出用户
      onlineNumber: 0,
      userName: "",
      loginOut: false,
      showTip: false,
      connectSuccess: false
    }
  }
  render() {
    const { isConnect, messages, connectSuccess, loginOut, loginOutName, currentMessage, currentName, onlineNumber, userName, initSuccess, showTip } = this.state
    return (
      <div className="talk" key="talk">
        <div className="talk-header">
          <h2>在线聊天室</h2>
          <p>
            <span className="num-content">当前在线人数 : <span key="userNum" className="userNum">{onlineNumber}</span>  </span>
            <span className="name-content">用户名:<span key="username" className="username">{currentName}</span></span>
          </p>
        </div>
        <section key="talk-section" className="talk-section">
          {
            showTip
              ? <div className="user-join-tip">{userName}进入了房间</div>
              : undefined
          }
          {
            loginOut
              ? <div className="user-join-tip">{loginOutName}离开了房间</div>
              : undefined
          }
          {
            isConnect
              ? undefined
              : <p className="init"><i className="icon icon-liaotian"></i>连接中...</p>
          }
          {
            !connectSuccess
              ? <p className="init connect-error"><i className="icon icon-guanbi "></i> 聊天室连接失败,快找李金珂解决</p>
              : <p className="init connect-success"><i className="icon icon-true "></i> 聊天室连接成功...</p>
          }
          {
            isConnect
              ? <ul key="talk-message-content">
                {
                  messages.map((item, i) => {
                    let { message, time, name, userId } = item
                    return (
                      <li key={i} className={
                        classNames(
                          "message",
                          {
                            "pull-right message-animte-right": userId == this.userId ? true : false
                          },
                          {
                            "pull-left message-animte-left": userId == this.userId ? false : true
                          },
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
          <input type="text" className="inp-message" value={currentMessage} placeholder="输入消息" onChange={this.saveMessage} />
          {
            currentMessage == ""
              ? <Button key="disabledSend" className="btn-send" style={{
                "border": "1px solid transparent"
              }}>发送</Button>
              : <Button key="sendMessage" type="primary" className="btn-send" onClick={this.sendMessage}>发送</Button>
          }
        </div>
      </div>
    )
  }
  //输入信息
  saveMessage = (e) => {
    this.setState({
      currentMessage: e.target.value
    })
  }
  //发送消息
  sendMessage = () => {
    const currentTime = helper.getCurrentTime() //当前时间
    const { currentMessage } = this.state
    this.socket.send({
      message: currentMessage,
      time: currentTime,
      userId: this.userId,
      name: this.name
    })
    //清空当前输入的消息
    this.setState({
      currentMessage: ""
    })

  }
  componentWillUnmount() {
    //组件移除，也就是退出时 关闭socket
    this.socket.emit('loginOut', { userId: this.userId, name: this.name })
    // this.socket.close()
  }
  componentDidMount() {
    this.socket = io(`${host}:${socket_port}`)
    this.section = ReactDOM.findDOMNode(this).querySelector(".talk-section")
    //读取历史聊天记录
    this.setState({
      messages: JSON.parse(sessionStorage.getItem("historyMessage")) || []
    })
    this.listenUserJoin()
    this.listenMessage()
    this.onCloseConnect()
    this.listenLoginOut()
    this.listenConnectError()
  }
  //连接断开
  listenLoginOut = () => {
    this.socket.on('loginOut', ({ onlineUsers, onlineNumber, loginOutName }) => {
      this.setState({
        loginOut: true,
        onlineNumber,
        loginOutName
      })
      setTimeout(() => {
        this.setState({
          loginOut: false
        })
      }, this.joinTipTime || 3000)
    })
  }
  //关闭连接
  onCloseConnect() {
    this.socket.on('disconnect', () => {
      console.log(`[用户 ${this.name}]退出 [用户 id ${this.userId}]`);
    })
  }
  //连接失败
  listenConnectFailed = () => {
    this.socket.on('connect_failed', () => {
      Message.error("连接失败")
      this.setState({
        connectSuccess: false
      })
    })
  }
  //监听错误
  listenConnectError = ()=>{
    this.socket.on('error',(e)=>{
      Message.error("错误")
      console.error(`[error]:${e}`);
    })
  }
  //监听消息
  listenMessage = () => {
    this.socket.on('message', (messageInfo) => {
      console.info(`接收到服务端发来的消息`, messageInfo);
      const messages = this.state.messages.concat(messageInfo)
      messages.length >= 1 && sessionStorage.setItem("historyMessage", JSON.stringify(messages))

      this.setState({ messages })
      this.section.scrollTop = this.section.scrollHeight

    })
  }
  //监听用户进入
  listenUserJoin = () => {
    this.socket.on('login', ({ serverTime }) => {
      console.info(`[socket连接成功]:${serverTime}`);
      this.userId = this.getUserId()
      this.name = `吃瓜群众${this.userId}`
      this.socket.emit('userJoin', {
        userId: this.userId,
        name: this.name
      })
      this.setState({
        isConnect: true,
        connectSuccess: true,
        currentName: this.name
      })
      console.info(`[userId]:${this.userId}`)
    })
    this.socket.on('userJoin', ({ onlineNumber, userName }) => {
      console.log(`[用户进入]:${userName} [在线人数]:${onlineNumber}`);
      this.setState({
        onlineNumber,
        userName,
        showTip: true
      })
      setTimeout(() => {
        this.setState({
          showTip: false
        })
      }, this.joinTipTime || 3000)
    })
  }
  //获取用户ID
  getUserId = () => {
    const userId = localStorage.getItem('userId') || this.createUserId()
    return userId
  }
  createUserId = () => {
    localStorage.setItem('userId', Date.now().toString(36))
    return localStorage.getItem('userId')
  }

}