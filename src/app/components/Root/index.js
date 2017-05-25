import React from "react"
import Loading from "shared/components/Loading"
import Header from "shared/components/Header"
import Weather from "shared/components/Weather"
//将所有组件包裹起来  react-router 会根据对应路由加载对应组件

export default class Root extends React.Component {
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
    return (
      <div>
         <Loading
            isLoading={isLoading}
          />
        <Header
          title="李金珂的小屋"
        />
        {/*<Weather
          type = {"snow"}                          // snow 下雪 rain 下雨
          snowR ={ Math.random() * 5 + 1 }        //雪花半径
          num= {12}                             //数量
        />*/}
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
    } else {
      document.onreadystatechange = ()=>{
        if (document.readyState === this.COMPLETE) {
            this.setState({
              isLoading:false
            })
        }
      }
    }
  }
  componentDidMount(){
    const isFirst= sessionStorage.getItem('welcome') || "yes"
    if(isFirst){
      setTimeout(this.loading,this.weclomeTime)
      sessionStorage.setItem('welcome',"no")
    }else{
      this.loading()
    }
  }
}