import  React  from 'react';
import ReactDOM from 'react-dom';

class NewsList extends React.Component {
    constructor(){
        super();
        this.state = {
            year:[2015,2016,2017,2018,2019],
            works:[],
            list:[],
            pages:0,
            page:0
        }
    }
    componentDidMount (){
        $.ajax({
            url:"/app/informa/list",
            type:"POST",
            success:(res)=>{
                this.setState({
                    list:res.data,
                    pages:Math.ceil(res.data.length/9)-1,
                    works:res.data.slice(0,9)
                }) 
            }
        })
    }
    bindLodingMore(){
        if(this.state.pages > this.state.page){
            let nub = this.state.page + 1;
            this.setState({
                page:nub,
                works:this.state.works.concat(this.state.list.slice(nub * 9 , (nub + 1) * 9))
            })
        }
    }
    render(){
        return (
            <div>
                <div className="init">
                    <h2>公司动态</h2>
                </div>
                <div className="adapt-box">
                    <div className="option">
                        <div className="all">
                            <a href="/">全部</a>
                        </div>
                        <div className="year">
                            <a href="javascript:">
                                <span>年份</span>
                                <i className="iconfont icon-jiantouxia"></i>
                            </a>
                            <input type="checkbox" className="select" title="点击选择" />
                            <ul>
                                {this.state.year.map((item)=>{
                                    return (
                                        <li key="item">{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="else">
                            <a href="/">媒体</a>
                        </div>
                        <div className="else">
                            <a href="/">内部</a>
                        </div>
                        <div className="else">
                            <a href="/">专业</a>
                        </div>
                    </div>
                    <div className="news">
                        {this.state.works.map((item)=>{
                            return (
                                <a className="new" href={`/app/news/${item._id}`} key="item._id" target="_blank">
                                    <img className="block w100" src={item.cover} alt="" />
                                    <div>
                                        <h2 className="title text-hide-1">{item.title}</h2>
                                        <time className="time">{item.createtime.replace(/(T).+/g,'')}</time>
                                        <span>SHOW NEW</span>
                                    </div>
                                </a>
                            )
                        })}
                        <div className="text-center">
                            <a className="ajax-more" href="javascript:" onClick={()=>this.bindLodingMore()}>加载更多</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <NewsList />,
    document.querySelector("#app")
)