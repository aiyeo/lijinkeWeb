import React from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Header from "shared/components/Header"
import RotatePhoto from "shared/components/RotatePhoto"
import Container from "shared/components/Container"
import MusicPlayer from "shared/components/MusicPlayer"
import { Link } from "react-router"

import getMusic from "./action"

const photos = [];
const photoCovers = [{
  id: 7,
  title: "皮皮怪",
  content: "蛇皮剪刀手"
}, {
  id: 8,
  title: "绿头怪",
  content: "一不小心就绿了"
}, {
  id: 2,
  title: "小仙女",
  content: "无敌剪刀手"
}, {
  id: 4,
  title: "大帅锅",
  content: "飞jer帅"
}, {
  id: 6,
  title: "余文乐",
  content: "高新区第一打手"
}, {
  id: 1,
  title: "骚猪葫芦娃",
  content: "叫你一声哈麻批你敢答应吗?"
}, {
  id: 5,
  title: "刘骚猪",
  content: "余文乐的男朋友"
}, {
  id: 3,
  title: "王骚猪",
  content: "随地大小便"
}, {
  id: 9,
  title: "肌肉狗",
  content: "疯起来自己都咬"
}, {
  id: 10,
  title: "父子台球solo赛",
  content: "duo死你个哈麻批"
}];
// const count = [...new Array(8)]

photoCovers.map((v, i) => {
  i += 1;
  let my = photoCovers.find((v) => v.id == i)
  v.name = `photo${i}`,
    v.src = `images/photo${i}`
  if (my) {
    v.title = my.title
    v.content = my.content
  } else {
    v.title = `title${i}`
    v.content = `content${i}`
  }
})

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
    return (
      <div key="home">
        <Header
          title="李金珂的小屋"
        />
        <main className="content" key="content">
          <Container>
            {/*<RotatePhoto
                  categories={photoCovers}
                  space={20}
                  width={300}
                  height={300}
                  animateTime={12}
              />*/}
          </Container>
        </main>
        <MusicPlayer
          musicSrc={musicData && musicData.src}
          imgSrc={musicData && musicData.image}
          name={musicData && musicData.name}
          mode={"mini"}       //full 完整模式  mini  迷你模式
        />
      </div>
    )
  }
  componentWillMount() {
    this.props.getMusic()
  }
}
