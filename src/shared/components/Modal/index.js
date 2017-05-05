import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import "./styles.less"

export default class Madal extends React.Component {
    static deafultProps = {
        title: "标题",
    }
    static PropTypes = {
        onCancel: PropTypes.func.isRequired
    }
    render() {
        const { children, title, visible, onCancel, className } = this.props
        return (
            <div key="jinke-modal-mask" className={classNames("jinke-modal-mask", className, { "modal-animate": visible })}>
                <div key="modal" className="jinke-modal">
                    <section key="modal-header" className="modal-header">
                        <h2 className="title">{title}</h2>
                        <span className="modal-close-btn" onClick={() => onCancel()}>
                            <i className="icon icon-guanbi1"></i>
                        </span>
                    </section>
                    <section key="modal-content" className="modal-content">
                        {children}
                    </section>
                </div>
            </div>
        )
    }
}