import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import Button from "shared/components/Button"
import "./styles.less"

export default class Madal extends React.PureComponent {
    static defaultProps = {
        title: "标题",
        onOk: () => { },
        onCancel: () => { },
        footer: []
    }
    static PropTypes = {
        onCancel: PropTypes.func.isRequired,
        footer: PropTypes.oneOfType([                      //footer 不需要设置为 footer={null}
            PropTypes.array,
            PropTypes.bool,
            PropTypes.object
        ])
    }
    render() {
        const { children, title, visible, onCancel, onOk, className, footer } = this.props

        return (
            <div key="jinke-modal-mask"
                className={
                    classNames(
                        "jinke-modal-mask",
                        className,
                        { "modal-animate": visible }
                    )
                }
            >
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
                    {
                        footer && footer.length >= 1
                            ? <section key="modal-footer" className="modal-footer">
                                {
                                    footer.map((btns) => btns)
                                }
                            </section>

                            : footer instanceof Array
                                ? <section key="modal-footer" className="modal-footer">
                                        <Button onClick={() => onCancel()}>取消</Button>,
                                        <Button type="info" onClick={() => onOk()}>确定</Button>
                                </section>
                                : undefined
                    }
                </div>
            </div>
        )
    }
}