import React from 'react'
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Container from "shared/components/Container"
import { Link } from "react-router"
import classNames from "classnames"
import moment from "moment"
import getArticleDetail from "./action"

@connect(
    ({ ArticleInfoAction }) => ({
        articleInfo: ArticleInfoAction.articleInfo,
    }),
    (dispatch) => (
        bindActionCreators({
            getArticleDetail
        }, dispatch)
    )
)

export default class ArticleDetail extends React.Component{
    render(){
        const { articleInfo } = this.props
        return(
            <div key="article-detail">
                <article class="article-detail">
                    <p>
                        {articleInfo}
                    </p>
                </article>
            </div>
        )
    }
    componentDidMount(){
        console.log(this.props);
        const {params:{id},getArticleDetail} = this.props
        getArticleDetail(id)
    }
}