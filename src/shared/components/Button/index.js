import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import "./styles.less"

export default class Button extends React.Component {
    static defaultProps = {
        type: "default",
        htmlType: "button"
    }
    static PropTypes = {
        type: PropTypes.oneOf(['primary', 'default', 'warning', 'success', 'error'])
    }
    render() {
        const { children, type, className, htmlType } = this.props
        return (
            <button
                type={htmlType}
                className={
                    classNames(
                        'jinke-btn',
                        'btn',
                        { 'btn-primary': type === "primary" },
                        { 'btn-warning': type === "warning" },
                        { 'btn-success': type === "success" },
                        { 'btn-error': type === "error" },
                        { 'btn-default': type === "default" },
                        { 'btn-disbled': type === "disbled" },
                        className
                    )
                }
            >
                <span>{children}</span>
            </button>
        )
    }
}