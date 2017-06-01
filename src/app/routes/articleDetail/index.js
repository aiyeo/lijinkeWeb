import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Message from "shared/components/Message"
import Button from "shared/components/Button"
import Modal from "shared/components/Modal"
import helper from "shared/libs/helper"
import { Link } from "react-router"
import classNames from "classnames"
import moment from "moment"
import getArticleDetail, { toggleLike, publishComment, getArticleComments } from "./action"

import "./styles.less"

@connect(
    ({ ArticleDetailAction }) => ({
        articleInfo: ArticleDetailAction.articleInfo,
        pageViewInfo: ArticleDetailAction.pageViewInfo,
        commentInfo: ArticleDetailAction.commentInfo,
        commentLists: ArticleDetailAction.commentLists
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleDetail,
            getArticleComments,
            toggleLike,
            publishComment
        }, dispatch)
    )
)

export default class ArticleDetail extends React.PureComponent {
    state = {
        isLike: false,        //true 为点赞 false 为取消赞
        likeNum: 0,           //文章喜欢数
        showTip: false,        //点赞提示
        commentModalVisible: false,
        articleLoading: true,
        commentLoading: true,
    }
    render() {
        const { articleInfo, commentLists } = this.props
        const comments = commentLists && commentLists.commentLists        //评论列表
        const detail = articleInfo && articleInfo.articleDetail
        const { isLike, likeNum, showTip, commentNum,commentModalVisible, articleLoading, commentLoading } = this.state

        return (
            <div>
                <Container>
                    <article className="article-detail" key="article-detail">
                        {
                            articleLoading
                                ? <p className="text-align"><i className="icon icon-shouye"></i> 文章加载中..</p>
                                : (
                                    <div key="article-detail-info">
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
                                            <span className="label pv">阅读量: {detail && detail.pageView}</span>
                                        </p>
                                    </div>
                                )
                        }

                    </article>
                    {/*文章评论*/}
                    <section className="article-comments-section">
                        <div className="article-comments-title">
                            <h3 className="title">
                                <span><i className="icon icon-shuohuaspeak"></i> 评论 ({comments && comments.length || "0"}) 条</span>
                                <a onClick={this.openCommentModal} className="comment-btn">发表评论</a>
                            </h3>
                        </div>
                        {
                            commentLoading
                                ? <p className="text-center"><i className="icon icon-shouye"></i> 评论加载中...</p>
                                : comments && comments.length >= 1
                                    ? <ul className="article-comments-lists" key="article-comments-lists">
                                        {
                                            comments.map((item, i) => {
                                                let {
                                                    commentName,
                                                    commentContent,
                                                    publishDate,
                                                    _id,
                                                    like = 0
                                                } = item
                                                return (
                                                    <li
                                                        className="item commentListAnimate"
                                                        key={i}
                                                        style={{ "animationDelay": `${i * 0.1}s` }}
                                                    >
                                                        <div className="inner">
                                                            <div className="comments-header">
                                                                <div className="img">
                                                                    <img src={require('images/default.jpeg')} alt="head-img" />
                                                                </div>
                                                                <span className="name">{commentName}</span>
                                                            </div>
                                                            <div className="comments-content">
                                                                <p>{commentContent}</p>
                                                            </div>
                                                            <div className="comments-footer">
                                                                <div className="like" onClick={() => this.likeComment(_id)}>
                                                                    <i className="icon icon-dianzan"></i>
                                                                    <span className="like-num">
                                                                        {
                                                                            like >= 1
                                                                                ? like
                                                                                : '赞'
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span className="time">{moment(publishDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                    : <p className="text-center"><i className="icon icon-xiayu"></i> 暂无评论</p>
                        }
                    </section>
                    <Modal
                        title="发表评论"
                        visible={commentModalVisible}
                        onCancel={this.cancelCommentModal}
                        className="comment-modal"
                    >
                        <form method="post" className="comment-form">
                            <fieldset>
                                <p className="label">您的姓名：</p>
                                <input type="text" autoComplete="true" onChange={(e) => this.setState({ commentName: e.target.value })} name="commentTile" className="comment-name" placeholder="请填写您的名字" minLength="1" maxLength="8" required />
                            </fieldset>
                            <fieldset>
                                <p className="label">您的邮箱：</p>
                                <input type="email" autoComplete="true" onChange={(e) => this.setState({ commentEmail: e.target.value })} name="commentTile" className="comment-name" placeholder="请填写您的邮箱" required />
                            </fieldset>
                            <fieldset>
                                <p className="label">文章内容：</p>
                                <textarea name="commentContent" onChange={(e) => this.setState({ commentContent: e.target.value })} className="comment-textarea" placeholder="有啥想说的~" maxLength="100" required></textarea>
                            </fieldset>
                            <fieldset>
                                <Button htmlType="button" onClick={this.publishComment} type="primary block">立即评论</Button>
                            </fieldset>
                        </form>
                    </Modal>
                </Container>
            </div>
        )
    }
    //点赞评论
    //TODO 完成评论点赞
    likeComment = async (commentId) => {
        // let { isLike, likeNum } = this.state
        // await this.props.toggleLikeComment(_id, !isLike)
        // this.setState({
        //     isLike: !isLike,
        //     showTip: true,
        //     likeNum: !isLike ? (++likeNum) : (--likeNum)
        // })
    }
    //发表评论
    publishComment = async (e) => {
        const {
           commentName,
            commentEmail,
            commentContent
       } = this.state
        if (!commentName) return Message.error('请填写姓名')
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(commentEmail)) return Message.error('请填写正确的邮箱')
        if (!commentContent) return Message.error('请填写评论')

        const { params: { _id } } = this.props

        const data = await this.props.publishComment({
            articleId: _id,
            commentName,
            commentEmail,
            commentContent,
            publishDate: helper.getCurrentTime()
        })
        if (this.props.commentInfo && this.props.commentInfo.success === 1) {
            Message.success('评论成功,请等待审核!')
            this.cancelCommentModal()
        } else {
            Message.error('评论失败!')
        }
    }
    openCommentModal = () => {
        this.setState({ commentModalVisible: true })
    }
    cancelCommentModal = () => {
        this.setState({ commentModalVisible: false })
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
    async componentDidMount() {
        const { params: { _id }, getArticleDetail, getArticleComments, addPageView } = this.props
        const { articleInfo } = this.props
        const detail = articleInfo && articleInfo.articleDetail
        await getArticleDetail(_id)
        await getArticleComments(_id)
        detail && this.setState({ likeNum: detail.like, articleLoading: false, commentLoading: false })
    }
}