var app = new Vue({
    el:"#app",
    data:{
        options:[
            {icon:"icon-icon-",link:"1",txt:"VR"},
            {icon:"icon-icon-",link:"2",txt:"影像"},
            {icon:"icon-icon-",link:"3",txt:"互动"}
        ],
        year:[2014,2015,2016,2017,2018],
        works:[],
        list:[],
        pages:0,
        page:0
    },
    mounted(){
        $.ajax({
            url: "/app/getWork",
            type: "POST",
            success: (res) => {
                this.list = res.data;
                this.pages = Math.ceil(res.data.length/9);
                this.filter(this.list.slice(0,9))
            }
        })
    },
    methods:{
        filter(db){
            var _this = this;
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
                _this.works.push(el)
            })
            this.page++;
        },
        bindLodingMore(){
            console.log(this.page)
            console.log(this.pages)
            if(this.page < this.pages){
                this.filter(this.list.slice(this.page * 9 , (this.page + 1) * 9));
            }
            
        },
        // 全部
        handleAjaxAll(){
            this.works = [];
        },
        //按类型查找
        handleAjaxType(e,type){
            let a = [{id:1,name:2},{id:1,name:2},{id:1,name:2},{id:3,name:2}]
            let arr = [].concat(this.list);
            let _arr = arr.filter((el)=>{
                if(el.type == "第一类型"){
                    return el
                }
            })
            console.log(_arr)
        }
    }
})
