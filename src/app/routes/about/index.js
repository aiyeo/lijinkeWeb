import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Modal from "shared/components/Modal"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import { Link } from "react-router"
import classNames from "classnames"

import "./styles.less"

const interestConfig = [
    {
        icon:"icon-2guanyuwomeneps",
        text:"李金珂 20岁"
    },{
        icon:"icon-dianzan",
        text:"手工业体力劳动者!"
    },{
        icon:"icon-article",
        text:`GitHub: {github}`
    },{
        icon:"icon-shuohuaspeak",
        text:"山前没相见,山后别相逢"
    }
]
// 人生就像函数式编程,传入一个参数,返回一个Function,每个阶段付出的东西不一样得到的东西也就不一样,只有不断的执行函数Fun()()()才会得到你想要的结果,我想:人生也是如此
export default class About extends React.PureComponent {
    state = {
        headerImgModalVisible:false,
        qrCodeModalVisible:false
    }
    render() {
        const {
            headerImgModalVisible,
            qrCodeModalVisible,
            alpha,
            beta,
            gamma
        } = this.state
        return (
            <Container className="about-section">
                <div className="header-img-content">
                    <div className="header-img">
                        <span className="line"></span>
                        <div className="img" onClick={this.onOpenHeaderImgModal}>
                            <div className='show-title'><span><i className="icon icon-zhaopian-copy"></i></span></div>
                        </div>
                    </div>
                </div>
                <section className="about-content">
                    <ul className="about-interest">
                        {
                            interestConfig.map((item,index)=>{
                                let {icon,text} = item
                                return (
                                    <li key={index} className={classNames("item")} style={{"animationDelay":`${.3 * (index+1) * 4}s`}}>
                                        <i className={classNames('icon',icon)}></i>
                                        {
                                            icon == "icon-article"
                                             ? <a className="text" href="https://github.com/lijinke666" alt="github" title="立即前往" target="_blank">https://github.com/lijinke666</a>
                                             : <span className="text">{text}</span> 
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                {/*TOTO  1.打赏二维码  2.留言  */}
                <section className="qr-section">
                    <Button type="error" onClick={this.openQrCodeModal}>打赏</Button>
                </section>
                {/*撞击头像小块块*/}
                <div className="strike-section">
                    <img src={require("images/strike.jpg")} alt="铁头娃"/>
                    {/*<img src={require("images/app.png")} alt="铁头娃"/>*/}
                </div>

                {/*查看照片*/}
                <Modal
                    title="长按识别二维码"
                    visible={qrCodeModalVisible}
                    onCancel={this.onCloseQrCodeModal}
                    className="qr-code-modal"
                >
                    <div className="pay-content">
                        {
                            qrCodeModalVisible
                            ? (
                                <ul className="code-lists">
                                    <li className="code"><img src={require('images/alipay.jpg')} alt="alipay"/></li>
                                    <li className="code"><img src={require("images/weChatPay.png")} alt="weChatPay"/></li>
                                </ul>
                            )
                          : undefined
                        }
                    </div>
                </Modal>
                <Modal
                    title="[丑照] 功能主治:颈椎与失眠"
                    visible={headerImgModalVisible}
                    onCancel={this.onCloseHeaderImgModal}
                    className="header-img-modal"
                >
                    <div className="header-img-modal-content">
                         <img src={require("images/head-img.jpg")} alt="丑照"/>
                    </div>
                </Modal>
            </Container>
        )
    }
    onCloseQrCodeModal = ()=>{
        this.setState({qrCodeModalVisible:false}) 
    }
    openQrCodeModal = ()=>{
        this.setState({qrCodeModalVisible:true})
    }
    onCloseHeaderImgModal = ()=>{
        this.setState({headerImgModalVisible:false})
    }
    onOpenHeaderImgModal = ()=>{
        this.setState({headerImgModalVisible:true})
    }
    componentDidMount(){

        console.info('关于我们动画设计制作 By:李金珂 :)')

    }
}