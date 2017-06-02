import React from "react"
import Loading from "shared/components/Loading"
import Header from "shared/components/Header"
import Weather from "shared/components/Weather"
import {connect} from "react-redux"
import { bindActionCreators } from "redux"
import loaded from "./action"
//将所有组件包裹起来  react-router 会根据对应路由加载对应组件

@connect(
  ({UploadAudioAction})=>({
    weather:UploadAudioAction.weather            //接受MusicPlayer组件传过来的 天气状态
  }),
  (dispatch) => (
    bindActionCreators({
      loaded
    }, dispatch)
  )
)
export default class Root extends React.PureComponent {
  weclomeTime = 6000
  constructor(props){
    super(props)
    this.state = {
      isLoading:true
    }
    this.COMPLETE = "complete"   //文档加载完成
  }
  render() {
    const {isLoading} = this.state
    const {weather} = this.props
    return (
      <div>
         <Loading
            isLoading={isLoading}
          />
        <Header
          title="李金珂的小屋"
        />
        {
          weather
            ? <Weather
              type = {"rain"}                          // snow 下雪 rain 下雨
              maxNum = {12}                             //最大数量
              angle = {10}                               //偏移角度
            />
            : undefined
        }

        {/*消息弹窗放在这里*/}
        <div key="jk-message" className="jk-message"></div>
          {this.props.children}
      </div>
    )
  }
  loading = ()=>{
    if ( document.readyState === this.COMPLETE ) {
      this.setState({
        isLoading:false
      })
      this.props.loaded(this.state.isLoading)
    } else {
      document.onreadystatechange = ()=>{
        if (document.readyState === this.COMPLETE) {
            this.setState({
              isLoading:false
            })
            this.props.loaded(this.state.isLoading)
        }
      }
    }
  }
  componentDidMount(){
    const isFirst= sessionStorage.getItem('welcome') || "yes"
    if(isFirst){
      sessionStorage.setItem('welcome',"no")
      setTimeout(this.loading,this.weclomeTime)
    }else{
      this.loading()
    }
  }
}