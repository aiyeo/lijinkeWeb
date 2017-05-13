import React from 'react'
import ReactDOM from "react-dom"
import Container from "shared/components/Container"
import { Link } from "react-router"

import "./styles.less"

export default class Article extends React.Component {
  render() {
    return (
      <Container className="article-section">
                <div className="article-list">
                    <section className="article-content-header">
                        <h2 className="title"><i className="icon icon-article"></i><span>文章列表</span></h2>
                    </section>
                    <section className="article-content">
                        <ul>
                            {
                                [...new Array(6)].map(()=>{
                                    return (
                                        <li className="item">
                                            <h2 className="title"><Link to="/">文章标题xxxxx</Link></h2>
                                            <p className="content">文章内容xxxxxxxxxx</p>
                                            <div className="info">
                                                <div>
                                                    <span className="auth">文章作者</span>
                                                    <span className="time">2015/5/14</span>
                                                    <span className="label"><span>杂文</span><span>感想</span></span>
                                                </div>
                                            
                                                <div className="like">
                                                    <span>阅读量:<i className="num">999</i></span>
                                                    <span><i className="icon icon-dianzan"></i><i className="num">99</i></span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                </div>
                { /*文章点击排行*/ }
                <div className="article-ranking"></div>
            </Container>
    )
  }
}