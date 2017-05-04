import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"

import "./styles.less"

export default class MusicPlayer extends React.Component {
    state = {
        toggle: false,       //显示隐藏
        playing: false,      //是否播放
        duration: 0,          //音乐总时长
        currentTime: 0,        //当前音乐进度
        isLoop:false,         //是否循环
        isMute:false,          //是否静音
        soundValue:100,
    }
    static defaultProps = {
        mode: "mini"     //默认迷你模式
    }
    static PropTypes = {
        mode: PropTypes.oneOf(['mini', 'full']),
        name: PropTypes.string,
        imgSrc: PropTypes.string,
        musicSrc: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props)
        this.audio = null       //当前播放器
        this.defaultMusciName = "今日音乐"
        this.defaultMusciImgSrc = require('images/photo8.jpg')
    }
    render() {
        const {
            musicSrc,
            name,
            imgSrc,
            mode,
            className
        } = this.props

        const { toggle, playing, duration, currentTime,isLoop,isMute,soundValue } = this.state

        //当前播放进度
        const progress = ((currentTime / duration) * 100).toFixed(2)

        return (
            <figure className={classNames("music-player", className)} key="music-player">
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
                                        <img key="img" src={imgSrc || this.defaultMusciImgSrc} alt="" />
                                    </div>
                                    <div className="progressbar-content" key="progressbar-content">
                                        <span>{name || this.defaultMusciName}</span>
                                        <section>
                                            <span key="current-time" className="current-time">
                                                {/*暂时只考虑10分钟以下的歌曲*/}
                                                {
                                                    (~~currentTime) < 60
                                                        ? `00:${(~~currentTime)<10 ? `0${~~currentTime}` : ~~currentTime}`
                                                        : `0${~~(currentTime / 60)}:${(~~(currentTime % 60) < 10) ? `0${~~(currentTime % 60)}` : ~~(currentTime % 60)}`
                                                }
                                            </span>
                                            <div className="progressbar" key="progressbar">
                                                <span key="progress" style={{ width: `${progress}%` }} className="progress"></span>
                                            </div>
                                            <span key="duration" className="duration">
                                                {
                                                    (duration / 60) < 10
                                                        ? `0${(duration / 60).toFixed(2)}`
                                                        : `${(duration / 60).toFixed(2)}`
                                                }
                                            </span>
                                        </section>
                                    </div>
                                    <div className="player-content" key="player-content">
                                        {/*播放与暂停*/}
                                        <span className="play-btn" key="play-btn" onClick={this.onPlay}>
                                            {
                                                playing
                                                    ? <i className="icon icon-zanting"></i>
                                                    : <i className="icon icon-iconfont31"></i>
                                            }
                                        </span>
                                        {/*循环,重放等功能*/}
                                        <span className="play-setting" key="play-setting">
                                            <i key="icon-setting" className="icon icon-set"></i>
                                            <ul className="play-setting-items">
                                                <li className="item" key="setting1"><i className="icon icon-set"></i></li>
                                                <li className="item" key="setting2"><i className="icon icon-set"></i></li>
                                                <li className="item" key="setting3"><i className="icon icon-set"></i></li>
                                            </ul>
                                        </span>
                                        {/*音量*/}
                                        <span className="play-sounds" key="play-sound">
                                            {
                                                isMute
                                                ? <i key="icon-jingyin" className="icon icon-jingyin" style={{"fontSize":"27px"}}></i>
                                                : <i key="icon-laba" className="icon icon-laba" onClick={this.onMute}></i>
                                            }
                                            <input type="range" value={soundValue} className="sound-operation" key="range" onChange={this.audioSoundChange} />
                                        </span>
                                        {
                                            mode === 'full'
                                            ? undefined
                                            : <span className="hide-panel" key="hide-panel-btn" onClick={this.onHidePanel}>
                                                收起
                                              </span>
                                        }
                                    </div>
                                </section>
                            </div>
                        )
                        : undefined
                }
                <audio key="audio" className="music-player-audio" src={musicSrc} controls loop={isLoop}></audio>
            </figure>
        )
    }
    openPanel = () => {
        this.setState({ toggle: !this.state.toggle })
    }
    //收起播放器
    onHidePanel = () => {
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
    //暂停
    pauseAudio = () => {
        this.audio.pause()
        this.setState({ playing: false })
    }
    //加载音频
    loadAudio = () => {
        if (this.audio.readyState == 4 && this.audio.networkState != 3) {
            this.setState({ playing: true })
            this.audio.play()
        }
    }
    //获取音频长度
    getAudioLength = () => {
        this.setState({
            duration: this.audio.duration
        })
    }
    loadAudioError = () => {
        this.setState({ playing: false })
        if (confirm('加载音频失败,重试？')) {
            this.onPlay()
        }
    }
    //音频播放结束
    audioEnd = () => {
        this.loadAudio()
    }
    //播放进度更新
    audioTimeUpdate = () => {
        const currentTime = this.audio.currentTime
        this.setState({
            currentTime
        })
    }
    //音量控制
    audioSoundChange = (e)=>{
        const value = e.target.value
        this.audio.volume = value / 100
        this.setState({
            soundValue:value
        })
    }
    //音量改变
    audioVolumeChange = ()=>{
        if(this.audio.volume <=0){
            this.setState({
                isMute:true
            })
        }else{
            this.setState({
                isMute:false
            })
        }
    }
    //静音
    onMute = ()=>{
        this.setState({
            isMute:true,
            soundValue:0
        })
        this.audio.volume = 0
    }
    toggleMode = (mode)=>{
        if(mode === "full"){
            this.setState({toggle:true})
        }
    }
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
        this.audio = dom.querySelector('audio')
        this.audio.addEventListener('waiting', this.loadAudio)
        this.audio.addEventListener('canplay', this.onPlay)
        this.audio.addEventListener('error', this.loadAudioError)
        this.audio.addEventListener('ended', this.audioEnd)
        this.audio.addEventListener('timeupdate', this.audioTimeUpdate)
        this.audio.addEventListener('volumechange', this.audioVolumeChange)
        this.toggleMode(this.props.mode)
    }
}