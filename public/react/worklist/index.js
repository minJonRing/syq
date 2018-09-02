import  React  from 'react';
import ReactDOM from 'react-dom';

class WorkList extends React.Component {
    constructor(){
        super();
        this.state = {
            year:[2015,2016,2017,2018,2019],
            works:[],
            list:[],
            pages:0,
            page:0,
            options:[
                {icon:"icon-icon-",link:"1",txt:"VR"},
                {icon:"icon-icon-",link:"1",txt:"影像"},
                {icon:"icon-icon-",link:"1",txt:"互动"}
            ],
        }
    }
    componentDidMount (){
        $.ajax({
            url:"/app/getWork",
            type:"POST",
            success:(res)=>{
                this.handleFilter(res.data.slice(0,9))
                this.setState({
                    list:res.data,
                    pages:res.data.length
                })
            }
        })
    }
    handleFilter(db){
        var arr = [].concat(this.state.works);
        db.map(function (el,index) {  
            if(index == 0){
                el.cla = "work1"
            }else if(index == 1 || index == 2 ){
                el.cla = "work2"
            }else if(index == 3 || index == 4 || index == 5){
                el.cla = "work3"
            }else if(index == 6){
                el.cla = "work4"
            }else if(index == 7){
                el.cla = "work5"
            }else{
                el.cla = "work6"
            }
            arr.push(el)
        })
        this.setState({
            works:arr
        })
    }
    handleLodingMore(){
        if(this.state.page < this.state.pages){
            this.state.page++;
        }
        this.handleFilter(this.state.list.slice(this.state.page * 9 , (this.state.page + 1) * 9));
    }
    render(){
        return (
            <div>
                <div className="bg">
                    <img className="block w100" src="http://www.bitone.com/template/1/default/_files/cn/img/case-open/bannner.jpg" alt="" />
                </div>
                <div className="init">
                    <h2>案例展示</h2>
                    <p>
                        <span>BITONE从成立至今，创作了众多视觉影像和营销解决方案,</span>
                        <span>被全球汽车品牌厂商、数字产品企业广泛应用于大型车展、产品上市发布会、TVC、</span>
                        <span>产品卖点宣传、线下虚拟影像互动、移动端互动等营销渠道。</span>
                    </p>
                </div>
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
                                    <li key={item} > {item} </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="detail">
                        {this.state.options.map((item)=>{
                            return (<a href="javascript:" key={item.txt} data-type={item.link}>
                                <i className={`iconfont ${item.icon}`}></i>
                                <span>{item.txt}</span>
                            </a>)
                        })}
                        
                    </div>
                </div>
                <div className="works">
                    {this.state.works.map((item)=>{
                        return (<a href={`/app/work/${item._id}`} className={`work ${item.cla}`} key={item._id} target="_blank">
                            <img src={item.cover} alt="" />
                            <p>
                                <i className="iconfont icon-dashuju"></i>
                                <span>{item.title}</span>
                            </p>
                        </a>)
                    })}
                    
                    <a className="ajax-more" href="javascript:" onClick={()=>this.handleLodingMore()}>加载更多</a>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <WorkList />,
    document.querySelector("#app")
)