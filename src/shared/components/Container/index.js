import React from 'react'
import "./index.less"

export default class Container extends React.Component{
    render(){
        const {className} = this.props
        return(
            <div key="container" className="container">
                <div className="wrap">
                    {this.props.children}
                </div>
            </div>
        )
    }
}