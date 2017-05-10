import React from "react"
import "./styles.less"

export default class Header extends React.Component{
    static defaultProps= {
        title :"李金珂"
    }
    state = {
        showBack:false
    }
    render(){
        const {animateTime} = this.props
        const animationDuration = {
            "animationDuration":`${animateTime}s`
        }
        const {showBack} = this.state
        return(
            <header key="header" className="header" style={animationDuration}>
                {
                    showBack
                    ?  <div key="left" className="block left" onClick={()=>this.goBack()}> 返回 </div>
                    : undefined
                }
                <div key="center" className="center">
                    <h2 key="title" className="title">{this.props.title}</h2>
                </div>
                {
                    showBack
                    ? <div key="right" className="block right"></div>
                    : undefined
                }
            </header>    
        )
    }
    componentDidMount(){
        if(history.length>1){
            this.setState({showBack:true})
        }
    }
    goBack = ( url )=>{
        if(history.length>1){
            this.setState({
                showBack:true
            })
        }else{
            if(typeof url =="undefined" || !url){
                url = "/"
            }
            history.href = url
        }
    }
}