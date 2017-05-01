import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import getMusic from "./action"

import "./styles.less"

@connect(
    ({MusicPlayerAction})=>({
        src:MusicPlayerAction.src
    }),
    (dispatch)=>(
        bindActionCreators({
            getMusic
        },dispatch)
    )
)
export default class MusicPlayer extends React.Component{
    render(){
        const {src} = this.props;
        console.log(src);
        return(
            <div className="music-player" key="music-player">
                <audio src={src} controls></audio>
            </div>
        )
    }
    componentWillMount(){
        this.props.getMusic()
    }
}