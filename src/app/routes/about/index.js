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
    }
    render() {
        return (
            <Container className="about-section">
                <div className="header-img-content">
                    <div className="header-img">
                        <span className="line"></span>
                        <div className="img">
                            <img src={require("images/head-img.jpg")} alt="loading"/>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}