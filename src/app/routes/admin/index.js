import React from 'react'
import ReactDOM from "react-dom"
import Button from "shared/components/Button"
import Message from "shared/components/Message"
import Modal from "shared/components/Modal"
import { Link } from "react-router"
import classNames from "classnames"
import helper from "shared/libs/helper"
import moment from "moment"
import {adminEmail} from "../../../../config"

import "./styles.less"

//暂时性的管理后台  用来管理文章审核
export default class Admin extends React.PureComponent {
    state = {
        articleList:[],
        contentModalVisible:false,
        content:"无"
    }
    render() {
        const {articleList,contentModalVisible,content} = this.state
        return (
            <section className="admin-section">
                <h2 className="title">文章审核</h2>
                <table>
                    <thead>
                        <tr>
                            <td>标题</td>
                            <td>内容</td>
                            <td>作者</td>
                            <td>发表日期</td>
                            <td>PV</td>
                            <td>赞</td>
                            <td>审核通过</td>
                            <td>邮箱</td>
                            <td>分类</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articleList && articleList.length >=1 
                            ? (
                                articleList.map((item,i)=>{
                                    const {
                                        _id,
                                        title,
                                        content,
                                        author,
                                        publishDate,
                                        pageView,
                                        like,
                                        approve,
                                        email = adminEmail,
                                        category
                                    } = item
                                    let date = moment(publishDate).format("YYYY-MM-DD HH:mm:ss")
                                    return (
                                        <tr>
                                            <td>{title}</td>
                                            <td><a onClick={()=>this.showContent(content)} className="btn btn-info">查看内容</a></td>
                                            <td>{author}</td>
                                            <td>{date}</td>
                                            <td>{pageView}</td>
                                            <td>{like}</td>
                                            <td>{approve ? "已审核" :"未审核"}</td>
                                            <td>{email}</td>
                                            <td>{category}</td>
                                            <td>
                                              {
                                                  !approve 
                                                  ? <Button type="info" onClick={()=>this.onApprove(_id,title,date,email)}>确认通过</Button>
                                                  : <span>已审核</span>
                                              }
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                            : (<tr>
                                <td>暂无数据</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <Modal
                    title="查看文章内容"
                    visible={contentModalVisible}
                    onCancel={this.cancelContentModal}
                    className="edit-article-modal"
                >
                    <article>
                        {
                            content
                        }
                    </article>
                </Modal>
            </section>
        )
    }
    cancelContentModal = ()=>{
        this.setState({
            contentModalVisible:false
        })
    }
    showContent = (content)=>{
        this.setState({
            contentModalVisible:true,
            content
        })
    }
    onApprove = async (id,title,publishDate,email)=>{
        if(confirm(`确认通过 【${title}】?`)){
            await helper.postJson('/admin/approve',{id,title,publishDate,email})
            Message.success('审核通过！')
            const data = await helper.getJson('/admin/articleList')
            this.setState({
                articleList:data.data
            })
        }
    }
    async componentDidMount(){
        const data = await helper.getJson('/admin/articleList')
        this.setState({
            articleList:data.data
        })
    }
}