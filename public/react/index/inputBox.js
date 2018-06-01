import React from 'react'

class inputBox extends React.Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div className="input-box">
                <p className="title">{this.props.name}</p>
                <input type="text" value={this.props.value} onChange={(event)=>{this.props.bindChange(event)}}/>
            </div>
        )
    }
}

export default inputBox;