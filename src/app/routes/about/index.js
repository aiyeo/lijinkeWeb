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

export default class About extends React.PureComponent {
    state = {
        headerImgModalVisible:false
    }
    render() {
        const {headerImgModalVisible} = this.state
        return (
            <Container className="about-section">
                <div className="header-img-content">
                    <div className="header-img">
                        <span className="line"></span>
                        <div className="img" onClick={this.onOpenHeaderImgModal}>
                            <img src={require("images/head-img.jpg")} alt="loading"/>
                            <div className='show-title'><span><i className="icon icon-zhaopian-copy"></i></span></div>
                        </div>
                    </div>
                </div>
                <section className="about-content">
                    <ul className="about-interest">
                        <li className="item"><i className="icon icon-2guanyuwomeneps"></i>李金珂</li>
                        <li className="item"><i className="icon icon-dianzan"></i>喜欢弹吉他,写代码,喜欢宋冬野</li>
                        <li className="item"><i className="icon icon-article"></i>GITHUB: <Link to="https://github.com/lijinke666">https://github.com/lijinke666</Link></li>
                        <li className="item"><i className="icon icon-shuohuaspeak"></i>山前没相见,山后别相逢</li>
                    </ul>
                </section>
                {/*TOTO  1.打赏二维码  2.留言  */}
                {/*撞击头像小块块*/}
                <div className="strike-section"></div>

                {/*查看照片*/}
                <Modal
                    title="丑照,治疗颈椎与失眠"
                    visible={headerImgModalVisible}
                    onCancel={this.onCloseHeaderImgModal}
                    className="header-img-modal"
                >
                    {
                        headerImgModalVisible
                        ? <img src={require("images/head-img.jpg")} alt="丑照"/>
                        : undefined
                    }
                </Modal>
            </Container>
        )
    }
    onCloseHeaderImgModal = ()=>{
        this.setState({headerImgModalVisible:false})
    }
    onOpenHeaderImgModal = ()=>{
        this.setState({headerImgModalVisible:true})
    }
    componentDidMount(){
        if(window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation",(e)=>{
                const alpha = e.alpha
                const beta = e.beta            //x轴旋转的角度
                const gamma = e.gamma          //z轴角度
            })
        }

    }
}