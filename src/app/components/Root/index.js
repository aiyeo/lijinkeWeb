import React from "react"
import Loading from "shared/components/Loading"
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
          />,
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
  componentWillMount(){
    const isFirst= sessionStorage.getItem('welcome') || "yes"
    if(isFirst === "yes"){
      setTimeout(this.loading,this.weclomeTime)
      sessionStorage.setItem('welcome',"no")
    }else{
      this.loading()
    }
  }
}