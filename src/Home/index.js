import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import MusicPlayer from "shared/components/MusicPlayer"
import { Link } from "react-router"
import classNames from "classnames"

import getMusic from "./action"
import "./styles.less"

@connect(
  ({ MusicPlayerAction }) => ({
    musicData: MusicPlayerAction.musicData
  }),
  (dispatch) => (
    bindActionCreators({
      getMusic
    }, dispatch)
  )
)

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { musicData } = this.props
    const featureConfig = [{
      title:"聊天室",
      text:"聊一聊",
      iconName:"icon-liaotian",
      href:"/talk"
    },{
      title:"照片墙",
      text:"看一看",
      iconName:"icon-zhaopian-copy",
      href:"/photo"
    },{
      title:"关于我",
      text:"看一看",
      iconName:"icon-2guanyuwomeneps",
      href:"/about"
    },{
      title:"有话说",
      text:"说一说",
      iconName:"icon-luyinshuohuashengyin",
      href:"/article"
    }]
    return (
      <div key="home">
        <main className="content" key="content">
          <div className="feature">
            <ul key="home-feature" className="feature-list">
              {
                featureConfig.map((item,i)=>{
                  const {title,text,iconName,href} = item
                  return (
                    <li key={`item${i}`} className="item">
                      <div className="info">
                        <h2 className="title">{title}</h2>
                        <p className="text">{text}</p>
                      </div>
                      <span className="line"></span>
                      <div className="icon-content">
                        <i className={classNames("icon",iconName)}></i>
                      </div>
                      <Link to={href}></Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </main>
        <MusicPlayer
          musicSrc={musicData && musicData.src}
          imgSrc={musicData && musicData.image}
          name={musicData && musicData.name}
          mode={"mini"}       //full 完整模式  mini  迷你模式
          isUploadAudio={false}
        />
      </div>
    )
  }
  componentWillMount() {
    this.props.getMusic()
  }
}
