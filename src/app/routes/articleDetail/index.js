import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import { Link } from "react-router"
import classNames from "classnames"
import moment from "moment"
import getArticleDetail,{addPageView} from "./action"

@connect(
    ({ ArticleDetailAction }) => ({
        articleInfo: ArticleDetailAction.articleInfo,
        pageViewInfo:ArticleDetailAction.pageViewInfo
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleDetail,
            addPageView
        }, dispatch)
    )
)

export default class ArticleDetail extends React.Component{
    render(){
        const { articleInfo } = this.props
        return(
            <div key="articleDetail">
                <Container>
                    <article className="article-detail">
                        <p>
                            11
                            {articleInfo}
                        </p>
                    </article>
                </Container>
            </div>
        )
    }
    countPageView = (id)=>{
        const countTime = localStorage.getItem('countTime') || new Date().getTime()
        this.props.addPageView(id,countTime)
    }
    componentDidMount(){
        const {params:{_id},getArticleDetail,addPageView} = this.props
        getArticleDetail(_id)
        this.countPageView(_id)
    }
}