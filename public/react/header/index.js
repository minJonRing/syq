import  React  from 'react';
import ReactDOM from 'react-dom'

class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            header : set_config.header,
            isPhoneShow:false
        }
    }
    handlePhoneShow(){
        let bl = !this.state.isPhoneShow;
        this.setState({isPhoneShow:bl});
    }
    handleShowInput(data){
        if(data){
            return (
                <input type="checkbox" className="tqr-nav-item-check" />
            )
        }
    }
    handleShowChild(data){
        if(data){
            return (
                <ul className="tqr-nav-item-list">
                    {data.map((item)=>{
                        return (
                            <li key="item.txt">
                                <a className="tqr-nav-child flex-center-1" href={item.link}>
                                    {item.txt}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    render(){
        let listShow = this.state.isPhoneShow?'tqr-nav-list-show':'';
        return (
            <div className="tqr-header">
                <div className="tqr-logo">
                    <img className="block" src="/images/web/logo.png" alt="" />
                </div>
                <div className="tqr-nav-box text-center">
                    <i className="tqr-nav-phone iconfont icon-mulu" onClick={()=>this.handlePhoneShow()}></i>
                    <div className={`tqr-nav-list ${listShow}`} >
                        {this.state.header.map((item)=>{
                            return (
                                <div className="tqr-nav-item" key={item.txt}>
                                    <a className="tqr-nav-item-txt" href={item.link}>{item.txt}</a>
                                    {this.handleShowInput(item.child)}
                                    {this.handleShowChild(item.child)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Header />,
    document.querySelector("#head")
)
 