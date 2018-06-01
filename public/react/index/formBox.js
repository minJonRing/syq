import React from 'react'
import InputBox from './inputBox';
import SelectBox from './selectBox';

class formBox extends React.Component {
    constructor(){
        super()
        this.state={
            data : {
                type:"22",
                name:"11",
                cover:"",
                cont:""
            },
            typeList : ["第一","第二","第三","第四"]
        }
    }
    bindShowState(){
        console.log(this.state)
    }
    bindChange(event,Type){
        let obj = {};
        obj[Type] = event.target.value;
        let newData = Object.assign({},this.state.data,obj)
        this.setState({data:newData})
    }
    bindType(event){
        try {           
            let newData = Object.assign({},this.state.data,{type:event.target.innerText})
            this.setState({data:newData})
        } catch (error) {
            
        }
        
    }
    bindCover(event){
        let el = event.target;
        let render = new FileReader();
        render.readAsDataURL(el.files[0])
        render.onload = (e) => {
            let newData = Object.assign({},this.state.data,{cover:e.target.result})
            this.setState({data:newData})
        }
    }
    render(){
        let img = this.state.data.cover?<img className="cover" src={this.state.data.cover} alt="" />:""
        return (
            <form>
                <SelectBox 
                    name = "类型"
                    value = {this.state.data.type}
                    typeList = {this.state.typeList} //typeList 是一个数组
                    bindType = {(event)=>this.bindType(event)}
                />
                <InputBox 
                    name = "标题"
                    value = {this.state.data.name}
                    bindChange={(event) =>{this.bindChange(event,'name')}}
                />
                <div className="input-box">
                    <p>封面</p>
                    <input type="file" onChange={(event)=>this.bindCover(event)} placeholder="*封面" accept="image/gif, image/jpeg, image/png" />
                </div>
                {img}
                <a href="javascript:" onClick={()=>{this.bindShowState()}}>11</a>
            </form>
        )
    }

}

export default formBox;