import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import { Link } from "react-router"
import classNames from "classnames"
import moment from "moment"
import getArticleDetail, { addPageView, toggleLike } from "./action"

import "./styles.less"

@connect(
    ({ ArticleDetailAction }) => ({
        articleInfo: ArticleDetailAction.articleInfo,
        pageViewInfo: ArticleDetailAction.pageViewInfo
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleDetail,
            addPageView,
            toggleLike
        }, dispatch)
    )
)

export default class ArticleDetail extends React.Component {
    state = {
        isLike: false,        //true 为点赞 false 为取消赞
        likeNum: 0,           //喜欢数
        showTip: false        //点赞提示
    }
    render() {
        const { articleInfo } = this.props
        const detail = articleInfo && articleInfo.articleDetail
        const { isLike, likeNum, showTip } = this.state

        return (
            <div>
                <Container>
                    <article className="article-detail">
                        <h2 className="title">{detail && detail.title}</h2>
                        <p className="author">{detail && detail.author} | {moment(detail && detail.publishDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                        <p className="content">{detail && detail.content}</p>
                        <p>
                            <button type="button" onClick={this.toggleLike} className={classNames('label', 'like', { "isLike": isLike })}>
                                <i className="icon icon-dianzan"></i>
                                {likeNum}
                                {
                                    showTip
                                        ? <span className={classNames('like-tip')}>{isLike ? '+1' : '-1'}</span>
                                        : undefined
                                }

                            </button>
                            <span className="label pv">阅读量:{detail && detail.pageView}</span>
                        </p>
                    </article>
                </Container>
            </div>
        )
    }
    //喜欢
    toggleLike = async () => {
        const { params: { _id } } = this.props
        let { isLike, likeNum } = this.state
        await this.props.toggleLike(_id, !isLike)
        this.setState({
            isLike: !isLike,
            showTip: true,
            likeNum: !isLike ? (++likeNum) : (--likeNum)
        })
        setTimeout(() => {
            this.setState({ showTip: false })
        }, 500)
    }
    //增加点击量
    countPageView = (id) => {
        // const countTime = localStorage.getItem('countTime') || new Date().getTime()
        this.props.addPageView(id)
    }
    async componentDidMount() {
        const { params: { _id }, getArticleDetail, addPageView } = this.props
        const { articleInfo } = this.props
        const detail = articleInfo && articleInfo.articleDetail
        await getArticleDetail(_id)
        await this.countPageView(_id)
        detail && this.setState({ likeNum: detail.like })
    }
}