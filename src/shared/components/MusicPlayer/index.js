import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import getMusic from "./action"

import "./styles.less"

@connect(
    ({ MusicPlayerAction }) => ({
        musicData: MusicPlayerAction.musicData
    }),
    (dispatch) => (
        bindActionCreators({
            getMusic
        }, dispatch)
    )
)
export default class MusicPlayer extends React.Component {
    state = {
        toggle: false,
        playing: false,
        duration:0,          //音乐总时长
        currentTime:0        //当前音乐进度
    }
    constructor(props) {
        super(props)
        this.audio = null
    }
    render() {
        const { musicData } = this.props;
        const { toggle, playing,duration,currentTime } = this.state
        const progress = ((currentTime/duration) * 100 ).toFixed(4)
        console.log(progress);
        return (
            <figure className="music-player" key="music-player">
                {/*控制按钮*/}
                {
                    toggle
                        ? undefined
                        : (
                            <div key="controller" className="scale music-player-controller" onClick={this.openPanel}>
                                <i className="icon icon-yinle"></i>
                                <div key="setting" className="music-player-controller-setting">{toggle ? "关闭" : "展开"}</div>
                            </div>
                        )
                }
                {/*播放器*/}
                {
                    toggle
                        ? (
                            <div key="panel" className="music-player-panel translate">
                                <section className="panel-content" key="panel-content">
                                    <div className="img-content" key="img-content">
                                        <img key="img" src={musicData && musicData.image} alt="" />
                                    </div>
                                    <div className="progressbar-content" key="progressbar-content">
                                        <span>{musicData && musicData.name}</span>
                                        <div className="progressbar" key="progressbar">
                                            <span key="progress" style={{ width: `${progress}%` }} className="progress"></span>
                                        </div>
                                    </div>
                                    <div className="player-content" key="player-content">
                                        <span className="play-btn" onClick={this.onPlay}>
                                            {
                                                playing
                                                    ? <i className="icon icon-zanting"></i>
                                                    : <i className="icon icon-iconfont31"></i>
                                            }
                                        </span>
                                        <span className="hide-panel" onClick={this.onHidePanel}>
                                            收起
                                        </span>
                                    </div>
                                </section>
                            </div>
                        )
                        : undefined
                }
                <audio key="audio" className="music-player-audio" src={musicData && musicData.src} controls></audio>
            </figure>
        )
    }
    openPanel = ()=>{
        this.setState({toggle:!this.state.toggle})
    }
    //收起播放器
    onHidePanel =()=>{
        this.openPanel()
    }
    //播放
    onPlay = () => {
        //是否在播放
        const { playing } = this.state
        if (playing === true) {
            this.pauseAudio()
        } else {
            this.getAudioLength();
            this.loadAudio();
        }
    }
    pauseAudio = () => {
        this.audio.pause()
        this.setState({ playing: false })
    }
    loadAudio = () => {
        if (this.audio.readyState == 4 && this.audio.networkState != 3) {
            this.setState({ playing: true })
            this.audio.play()
        }
    }
    getAudioLength = ()=>{ 
        this.setState({
            duration:this.audio.duration
        })
    }
    loadAudioError = () => {
        this.setState({ playing: false })
        alert('加载音频失败')
    }
    audioEnd = () => {
        this.loadAudio()
    }
    audioTimeUpdate = ()=>{
        const currentTime = this.audio.currentTime 
        this.setState({
            currentTime
        })
    }
    componentWillMount() {
        //获取音频src
        this.props.getMusic()
    }
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
        this.audio = dom.querySelector('audio')
        this.audio.addEventListener('waiting', this.loadAudio)
        this.audio.addEventListener('canplay', this.onPlay)
        this.audio.addEventListener('error', this.loadAudioError)
        this.audio.addEventListener('ended', this.audioEnd)
        this.audio.addEventListener('timeupdate',this.audioTimeUpdate)
    }
}