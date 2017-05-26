/*
 * @Author: jinke.li 
 * @Date: 2017-05-12 13:54:48 
 * @Last Modified by: jinke.li
 * @Last Modified time: 2017-05-12 14:19:52
 */
import React, { propTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import "./styles.less"

class Element extends React.PureComponent {
    state = {
        remove: false
    }
    componentDidMount() {
        const { duration, onClose } = this.props
        setTimeout(() => {
            this.setState({remove:true})
            onClose && onClose instanceof Function && onClose()
        }, duration * 1000)
    }
    render() {
        const {
             type,
            content,
            duration
         } = this.props
        const { remove } = this.state;

        const typeConfig = {
            info: "info",
            success: "success",
            error: "error",
            warning: "warning",
            loading: "loading"
        }

        const isShowClassName = type === typeConfig

        return (
            <div>
                {
                    remove
                        ? undefined
                        : (
                            <div key="message" className="jk-message-notice-content">
                                <div
                                    className={
                                        classNames(
                                            'jk-message-custom-content',
                                            `message-${typeConfig[type]}`
                                        )
                                    }

                                >
                                    <p className="icon">
                                        <i className={
                                            classNames(
                                                "icon",
                                                { "icon-laba": type === typeConfig['info'] },
                                                { "icon-true": type === typeConfig['success'] },
                                                { "icon-guanbi": type === typeConfig['error'] },
                                                { "icon-gantanhao": type === typeConfig['warning'] },
                                                { "icon-dianzan": type === typeConfig['loading'] }
                                            )
                                        }
                                            key="message-icon">
                                        </i>
                                    </p>
                                    <p className="text">
                                        {content}
                                    </p>
                                </div>
                            </div>
                        )
                }
            </div>
        )
    }
}

const Message = {
    defaultContent: "提示",
    defaultDuration: 2,
    RenderElement(type, content, duration, onClose) {
        const ele = React.createElement(Element, {
            type,
            content,
            duration,
            onClose
        }, null)
        ReactDOM.render(
            ele,
            document.querySelector(".jk-message")
        )
    },
    info(content = this.defaultContent, duration = this.defaultDuration, onClose) {
        this.RenderElement("info", content, duration, onClose)
    },
    success(content = this.defaultContent, duration = this.defaultDuration, onClose) {
        this.RenderElement("success", content, duration, onClose)
    },
    warning(content = this.defaultContent, duration = this.defaultDuration, onClose) {
        this.RenderElement("warning", content, duration, onClose)
    },
    error(content = this.defaultContent, duration = this.defaultDuration, onClose) {
        this.RenderElement("error", content, duration, onClose)
    },
    loading(content = this.defaultContent, duration = this.defaultDuration, onClose) {
        this.RenderElement("loading", content, duration, onClose)
    }

}

export default Message
