import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import Modal from "shared/components/Modal"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import helper from "shared/libs/helper"
import { Link } from "react-router"
import classNames from "classnames"
import moment from "moment"
import getArticleLists, { getArticleRanking, addPageView, uploadArticle } from "./action"

import "./styles.less"

@connect(
    ({ ArticleAction }) => ({
        articleLists: ArticleAction.lists,
        ranking: ArticleAction.ranking,
        uploadInfo: ArticleAction.uploadInfo
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleLists,
            getArticleRanking,
            uploadArticle,
            addPageView
        }, dispatch)
    )
)
export default class Article extends React.PureComponent {
    state = {
        rankingType: "like",       //默认喜欢 降序排列
        articleModalVisible: false,
        editTitle: "",              //上传文章标题
        editAuthor: "",            //上传文章作者
        editContent: "",            //上传文章内容
        editCategory: ["杂文"],       //上传文章分类
        editEmail: ""               //作者邮箱
    }
    render() {
        const { articleLists, ranking } = this.props
        const { rankingType, articleModalVisible } = this.state
        return (
            <Container className="article-section">
                <div className="article-list">
                    <section className="article-content-header">
                        <h2 className="title">
                            <span><i className="icon icon-article"></i><span>文章列表</span></span>
                            <a onClick={this.openArticleModal} className="eidt-article-btn">编写文章</a>
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
                                                const { title, content, author, publishDate, pageView, like, category, _id } = list
                                                return (
                                                    <li
                                                        className="item articleListAnimate"
                                                        key={i}
                                                        style={{ "animationDelay": `${i * 0.1}s` }}
                                                        onClick={() => this.addPageView(_id)}
                                                    >
                                                        <h2 className="title"><Link to={`/article/detail/${_id}`}>{title}</Link></h2>
                                                        <p className="content">{content}</p>
                                                        <div className="info">
                                                            <div>
                                                                <span className="auth">{author}</span>
                                                                <span className="time">{moment(publishDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                                                                <span className="label">
                                                                    {
                                                                        category.map((item, index) => {
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

                                : <p style={{ "textAlign": "center" }}><i className="icon icon-article"></i>努力加载中 :)</p>
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
                                    let { title, like, pageView, _id } = data
                                    return (
                                        <li key={i} className="ranking-item" style={{ "animationDelay": `${i * 0.1}s` }}>
                                            <span className="article-name" onClick={() => this.addPageView(_id)}><Link to={`/article/detail/${_id}`}>{title}</Link></span>
                                            {
                                                rankingType === 'like'
                                                    ? <span className={classNames("type", "like")}>喜欢量: {like}</span>
                                                    : <span className={classNames("type", "pageView")}>阅读量: {pageView}</span>
                                            }

                                        </li>
                                    )
                                })
                                : <li>正在拼命加载...</li>
                        }
                    </ul>
                </div>
                <Modal
                    title="编写文章"
                    visible={articleModalVisible}
                    onCancel={this.cancelArticleModal}
                    className="edit-article-modal"
                >
                    <form method="post" className="edit-form">
                        <fieldset>
                            {/*<span className="label">文章名：</span>*/}
                            <input type="text" onChange={(e) => this.setState({ editTitle: e.target.value })} name="editTile" className="edit-title" placeholder="标题,做个标题党" maxLength="20" required />
                        </fieldset>
                        <fieldset>
                            {/*<span className="label">作者名：</span>*/}
                            <input type="text" onChange={(e) => this.setState({ editAuthor: e.target.value })} name="editAuthor" className="edit-author" placeholder="姓名,默认【佚名】" maxLength="10" />
                        </fieldset>
                        <fieldset>
                            {/*<span className="label">邮箱：</span>*/}
                            <input type="email" onChange={(e) => this.setState({ editEmail: e.target.value })} name="editAuthor" className="edit-author" placeholder="邮箱,审核通过将通过此邮箱通知你" required />
                        </fieldset>
                        <fieldset>
                            <p>文章内容：</p>
                            <textarea name="editContent" onChange={(e) => this.setState({ editContent: e.target.value })} className="edit-textarea" placeholder="有啥想说的~" required></textarea>
                        </fieldset>
                        <fieldset>
                            <p>文章分类：</p>
                            <select onChange={this.categoryChange}>
                                <option value="杂文">杂文</option>
                                <option value="日记">日记</option>
                                <option value="心得">心得</option>
                                <option value="感悟">感悟</option>
                                <option value="随笔">随笔</option>
                                <option value="其他">其他</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <Button htmlType="button" onClick={this.publishArticle} type="primary block">发表</Button>
                        </fieldset>
                    </form>
                </Modal>
            </Container>
        )
    }
    addPageView = (id) => {
        this.props.addPageView(id)
    }
    categoryChange = (e) => {
        this.setState({ editCategory: [e.target.value] })
    }
    openArticleModal = () => {
        this.setState({ articleModalVisible: true })
    }
    cancelArticleModal = () => {
        this.setState({ articleModalVisible: false })
    }
    //上传文章
    publishArticle = async () => {
        const {
            editTitle,
            editAuthor = "佚名",
            editContent,
            editEmail,
            editCategory
        } = this.state

        if (!editTitle) return Message.error('请填写文章标题!')
        if (!editContent) return Message.error('文章内容不能为空!')
        if (!editEmail) return Message.error('邮箱不能为空!')

        let values = {}
        values.editTitle = editTitle
        values.editAuthor = editAuthor
        values.editContent = editContent
        values.editCategory = editCategory
        values.editEmail = editEmail
        values.publishDate = helper.getCurrentTime()
        values.pageView = "0"
        values.like = "0",
            values.approve = false,           //是否审核通过
            await this.props.uploadArticle(values)
        if (this.props.uploadInfo && this.props.uploadInfo.success === 1) {
            Message.success('上传成功,请等待审核!')
            this.setState({ articleModalVisible: false })
        } else {
            Message.error('上传失败!')
        }
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