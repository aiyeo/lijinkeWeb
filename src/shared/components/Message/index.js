import React, { propTypes } from "react"
import classNames from "classnames"
import "./styles.less"


export default class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: typeConfig.info,
            visible: false
        }
    }
    info = (content, duration, onClose) => {
        setTypeState(
            this.typeConfig['info'],
            content,
            duration,
            onClose
        )
    }
    setTypeState = (type = {}, content = "message", duration = 1.5, onClose) => {
        this.setState({
            visible: true,
            type
        })
        this.onClose(duration, onClose)
    }
    onClose = (duration, cb) => {
        setTimeout(() => {
            this.setState({ visible: false })
            cb && (cb instanceof Function) && cb()
        }, duration * 1000)
    }
    render() {
        const {
            content,
            duration,
            onClose,
            visible,
            type
        } = this.state

        const typeConfig = {
            info: "info",
            success: "success",
            error: "error",
            warning: "warning",
            loading: "loading"
        }[type]

        const isShowClassName = type === typeConfig
        return (
            <div key="jk-message" className="jk-message">
                {
                    visible
                        ? (
                            <div key="message" className="jk-message-notice-content">
                                <div
                                    className={
                                        classNames(
                                            'jk-message-custom-content',
                                            { "message-info":isShowClassName },
                                            { "message-success":isShowClassName },
                                            { "message-error":isShowClassName },
                                            { "message-warning": isShowClassName },
                                            { "message-loading": isShowClassName },
                                        )
                                    }

                                >
                                    <p className="icon">
                                        <i className={
                                            classNames(
                                                "icon",
                                                { "icon-laba": isShowClassName },
                                                { "icon-true": isShowClassName },
                                                { "icon-guanbi": isShowClassName },
                                                { "icon-gantanhao": isShowClassName },
                                                { "icon-dianzan": isShowClassName }
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
                        : undefined
                }
            </div>
        )
    }
}