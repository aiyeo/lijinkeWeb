import React from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import { Link } from "react-router"
import getHomeInfo from "./action"

@connect(
  ({HomeAction})=>({
    info:HomeAction.data
  }),
  (dispatch)=>(
    bindActionCreators({
      getHomeInfo
    },dispatch)
  )
)
export default class Home extends React.Component {
  render() {
    return (
      <div key="home">
        <h2>{this.props.info}</h2>
      </div>
    )
  }
  componentWillMount(){
    this.props.getHomeInfo()
  }
}
