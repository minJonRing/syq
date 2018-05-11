var app = new Vue({
    el:"#app",
    data:{
        nav:set_config.header,
        options:[
            {icon:"icon-icon-",link:"1",txt:"VR"},
            {icon:"icon-icon-",link:"1",txt:"影像"},
            {icon:"icon-icon-",link:"1",txt:"互动"},
            {icon:"icon-icon-",link:"1",txt:"数字演员"},
            {icon:"icon-icon-",link:"1",txt:"晶振"},
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
                this.pages = res.data.length;
                this.filter(this.list.slice(0,9))
            }
        })
    },
    methods:{
        filter(db){
            var _this = this;
            db.map(function (el,index) {  
                if(index == 0 || index == 8){
                    el.cla = "work1"
                }else if(index == 1 || index == 2 || index == 6){
                    el.cla = "work2"
                }else if(index == 7){
                    el.cla = "work4"
                }else{
                    el.cla = "work3"
                }
                _this.works.push(el)
            })
        },
        bindLodingMore(){
            if(this.page < this.pages){
                this.page++;
            }
            this.filter(this.list.slice(this.page * 9 , (this.page + 1) * 9));
        }
    }
})
