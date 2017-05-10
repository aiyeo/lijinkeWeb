import React from 'react'
import Button from "shared/components/Button"
import "./styles.less"
import config from "config"
import io from "socket.io-client"

export default class Talk extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
      return (
          <div className="talk" key="talk">
            <h2>在线聊天室</h2>
            <p>当前在线人数 : <span className="userNum">--</span> 用户名:<span className="username">--</span></p>
            <section className="talk-section">
                <ul>

                </ul>
            </section>
            <div className="talk-btn">
                <input type="text" className="inp-message" placeholder="输入消息"/>
                <Button type="primary" className="btn-send">发送</Button>
            </div>
          </div>
      )
    }
    componentDidMount(){
        const socket = io(`${config.host}:${config.socket_port}`)
        socket.on('connect',()=>{
            console.debug('socket connect success');
        })
    }

}