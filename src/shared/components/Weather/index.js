import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import classNames from "classnames"
import "./styles.less"

export default class Weather extends React.Component {
    static defaultProps = {
        strokeColor: "rgba(255,255,255,.4)",
        speed: Math.random() * 5 + 5,          //速度
        snowR: Math.random() * 10 + 1,          //雪花半径
        rainLen: Math.random() * 10 + 5,        //雨点长度
        num: 20,                                  //数量
        type:"snow"                              //类型
    }
    state = {
        data: []              //存储每一个的坐标和半径
    }
    static PropTypes = {
        strokeColor: PropTypes.string,          //颜色
        speed: PropTypes.number,          //速度
        snowR:  PropTypes.number,          //雪花半径
        rainLen:  PropTypes.number,          //雨点长度
        num: PropTypes.number,        //数量
        type:PropTypes.oneOf(['snow','rain'])        //飘雪 or  下雨
    }
    random() {

    }
    render() {
        return (
            <canvas className="rain-canvas"></canvas>
        )
    }
    _resize = () => {
        window.addEventListener('resize', () => {
            this.canvasWidth = document.body.clientWidth
            this.canvasHeight = document.body.clientHeight
        })
    }
    draw = () => {
        const { num, snowR , type, strokeColor,speed,rainLen} = this.props
        const data = this.data
        this.context.clearRect(0, 0, this.canvasHeight, this.canvasHeight)
        this.context.save()
        this.context.fillStyle = strokeColor
        this.context.lineWidth =2 
        this.context.strokeStyle = strokeColor
        this.context.beginPath()
        for (let i = 0; i < num; i++) {
            var d = data[i]
            this.context.moveTo(d.x, d.y)
            if(type == "snow"){
                this.context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
            }else{
                this.context.lineTo(d.x, d.y+=rainLen)
            }
        }
        this.context.fill()
        this.context.stroke()
        this.failY()
        this.context.closePath()
        this.context.restore()
    }
    failY = () => {
        const { num, snowR, speed } = this.props
        const data = this.data
        for (let i = 0; i < num; i++) {
            var d = data[i]
            d.y += speed
            if (d.y > this.canvasHeight) {
                d.y = 0
            }
        }
    }
    componentDidMount() {
        this.canvas = ReactDOM.findDOMNode(this)
        const { num, snowR } = this.props
        this.context = this.canvas.getContext('2d')
        this.canvasWidth = document.body.clientWidth
        this.canvasHeight = document.body.clientHeight
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.data = []
        for (let i = 0; i < num; i++) {
            this.data.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight,
                r: snowR
            })
        }
        setInterval(this.draw, 40)
        this._resize()
    }
}