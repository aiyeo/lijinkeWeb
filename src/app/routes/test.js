import React from "react"
import Button from "shared/components/Button"
import Message from "shared/components/Message"

export default class Test extends React.Component{
    onTest = ()=>{
        Message.info("哈哈",4,()=>{
            alert('关闭')
        })
    }
    render(){
        return(
            <Button type="info" onClick={this.onTest}>点击</Button>    
        )
    }
}