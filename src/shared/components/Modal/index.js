import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import "./styles.less"

export default class Madal extends React.Component{
    static deafultProps = {
        title:"标题",
        visible:true
    }
    render(){
        const {children,title,visible} = this.props
        return(
            <div key="jinke-modal-mask" className="jinke-modal-mask">
                <div key="modal" className="jinke-modal">
                    <section key="modal-header" className="modal-header">
                        <h2 className="title">{title}</h2>
                    </section>
                    <section key="modal-content" className="modal-content">
                        {children}
                    </section>
                </div>
            </div>
        )
    }
}