import React from "react"
import "./styles.less"

export default class Header extends React.Component{
    static defaultProps= {
        title :"李金珂"
    }
    render(){
        const {animateTime} = this.props
        const animationDuration = {
            "animationDuration":`${animateTime}s`
        }
        return(
            <header key="header" className="header" style={animationDuration}>
                <h2 key="title" className="title">{this.props.title}</h2>
            </header>    
        )
    }
}