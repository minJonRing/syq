var app = new Vue({
    el:"#app",
    data:{
        nav:[
            {link:"/",txt:"SINQ业务",child:[{link:"/",txt:"三维产品动画"},{link:"/",txt:"影视广告TVC"},{link:"/",txt:"产地创意工厂"}]},
            {link:"/app/works",txt:"案例展示",child:[{link:"/app/works",txt:"作品收集"}]},
            {link:"/app/news",txt:"新闻动态"},
            {link:"/",txt:"关于SINQ",child:[{link:"/",txt:"公司介绍"},{link:"/",txt:"企业文化"}]},
            {link:"/",txt:"我们的客户",child:[{link:"/",txt:"合作客户"}]},
            {link:"/",txt:"加入我们"},
            {link:"/",txt:"联系我们"}
        ],
        options:[
            {icon:"icon-icon-",link:"1",txt:"VR"},
            {icon:"icon-icon-",link:"1",txt:"影像"},
            {icon:"icon-icon-",link:"1",txt:"互动"},
            {icon:"icon-icon-",link:"1",txt:"数字演员"},
            {icon:"icon-icon-",link:"1",txt:"晶振"},
        ],
        year:[2014,2015,2016,2017,2018],
        works:[]
    },
    mounted(){
        var img = "http://www.bitone.com/uploads/1/image/public/201805/20180507112728_47vmh2c8qv.jpg";
        var db = [
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"},
            {url:img,txt:"A-Z-llll"}
        ]
        this.filter(db)
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
        }
    }
})
