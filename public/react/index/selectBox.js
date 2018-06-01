import React from 'react'

class selectBox extends React.Component{
    constructor(){
        super()
        this.state = {
            isShow:false,
            className:""
        }
    }
    bindIsShow(){
        let a = !this.state.isShow
        this.setState({isShow:a});
        if(a){
            this.setState({className:"show"})
        }else{
            this.setState({className:""})
        }
    }
    render(){
        return (
            <div className="input-box">
                <p>{this.props.name}</p>
                <div className="select" onClick={()=>{this.bindIsShow()}}>
                    <span>{this.props.value}</span>
                    <ul className={this.state.className}>
                        {this.props.typeList.map((item)=>{
                                return (<li key={item} onClick={(event)=>{this.props.bindType(event)}}>{item}</li>)
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default selectBox;