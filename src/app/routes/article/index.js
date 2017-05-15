import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import { Link } from "react-router"
import classNames from "classnames"
import  getArticleLists ,{getArticleRanking } from "./action"

import "./styles.less"

@connect(
    ({ ArticleAction }) => ({
        articleLists: ArticleAction.lists,
        ranking: ArticleAction.ranking
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleLists,
            getArticleRanking
        }, dispatch)
    )
)
export default class Article extends React.Component {
    state = {
        rankingType: "like"        //默认喜欢 降序排列
    }
    render() {
        const { articleLists, ranking } = this.props
        const { rankingType } = this.state
        return (
            <Container className="article-section">
                <div className="article-list">
                    <section className="article-content-header">
                        <h2 className="title">
                            <i className="icon icon-article"></i><span>文章列表</span>
                        </h2>
                    </section>
                    <section className="article-content">

                        {
                            articleLists && articleLists.length >= 1
                                ?
                                (
                                    <ul>
                                        {
                                            articleLists.map((list, i) => {
                                                const { title, content, author, publishDate, pageView, like,category } = list
                                                return (
                                                    <li className="item articleListAnimate" key={i}  style={{"animationDelay":`${i*0.1}s`}}>
                                                        <h2 className="title"><Link to="/">{title}</Link></h2>
                                                        <p className="content">{content}</p>
                                                        <div className="info">
                                                            <div>
                                                                <span className="auth">{author}</span>
                                                                <span className="time">{publishDate}</span>
                                                                <span className="label">
                                                                    {
                                                                        category.map((item,index)=>{
                                                                            return (
                                                                            <span key={index}>{item}</span>
                                                                            )
                                                                        })
                                                                    }
                                                                </span>
                                                            </div>

                                                            <div className="like">
                                                                <span>阅读量:<i className="num">{pageView}</i></span>
                                                                <span><i className="icon icon-dianzan"></i><i className="num">{like}</i></span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                )

                                : <p><i className="icon icon-article"></i>暂无文章</p>
                        }

                    </section>
                </div>
                { /*文章点击排行*/}
                <div className="article-ranking">
                    <section className="article-ranking-header">
                        <h2 className="title">
                            <i className="icon icon-dianzandian"></i><span>文章排行</span>
                            <span className="category">
                                <a className={classNames({ 'active': rankingType === "like" })} onClick={() => this.toggleRanking('like')}>喜欢榜</a>
                                <a className={classNames({ 'active': rankingType === "pageView" })} onClick={() => this.toggleRanking('pageView')}>阅读榜</a>
                            </span>
                        </h2>
                    </section>
                    <ul className="article-ranking-list">
                        {
                            ranking && ranking.rankingData && ranking.rankingData.length >= 1
                                ? ranking.rankingData.map((data, i) => {
                                    let { title, like, pageView } = data
                                    return (
                                        <li key={i} className="ranking-item" style={{"animationDelay":`${i*0.1}s`}}>
                                            <span className="article-name">{title}</span>
                                            {
                                                rankingType === 'like'
                                                    ? <span className={classNames("type", "like")}>喜欢量: {like}</span>
                                                    : <span className={classNames("type", "pageView")}>阅读量: {pageView}</span>
                                            }

                                        </li>
                                    )
                                })
                                : undefined
                        }
                    </ul>
                </div>
            </Container>
        )
    }
    publishArticle = ()=>{

    }
    toggleRanking = (rankingType) => {
        this.setState({ rankingType })
        this.props.getArticleRanking(rankingType)
    }
    componentDidMount() {
        this.props.getArticleLists()
        this.props.getArticleRanking(this.state.rankingType)
    }
}