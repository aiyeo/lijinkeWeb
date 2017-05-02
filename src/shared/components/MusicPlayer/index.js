import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import getMusic from "./action"

import "./styles.less"

@connect(
    ({MusicPlayerAction})=>({
        data:MusicPlayerAction.src
    }),
    (dispatch)=>(
        bindActionCreators({
            getMusic
        },dispatch)
    )
)
export default class MusicPlayer extends React.Component{
    state = {
        toggleText:"展开"   
    }
    render(){
        const {data} = this.props;
        const { toggleText } = this.state
        return(
            <figure className="music-player" key="music-player">
                <div key="controller" className="music-player-controller">
                    <i className="icon icon-yinle"></i>
                    <div key="setting" className="music-player-controller-setting">{toggleText}</div>
                </div>
                <audio key="audio" className="music-player-audio" src={data && data.src} controls></audio>
            </figure>
        )
    }
    loadAudio = (audio)=>{
        if(audio.readyState == 4 && audio.networkState !=3){
            audio.play()
        }
    }
    loadAudioError = (audio)=>{
        alert('加载音频失败')
    }
    audioEnd = (audio)=>{
        this.loadAudio(audio)
    }
    componentWillMount(){
        //获取音频src
        this.props.getMusic()
    }
    componentDidMount(){
        const dom = ReactDOM.findDOMNode(this)
        const audio = dom.querySelector('audio')
        audio.addEventListener('waiting', ()=> this.loadAudio(audio))
        audio.addEventListener('canplay',()=>this.loadAudio(audio))
        audio.addEventListener('error',()=>this.loadAudioError(audio))
        audio.addEventListener('ended',()=>this.audioEnd(audio))
    }
}