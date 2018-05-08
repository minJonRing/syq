var app = new Vue({
    el:"#app",
    data () {
        return {
            nav:[
                {link:"/",txt:"SINQ业务",child:[{link:"/",txt:"三维产品动画"},{link:"/",txt:"影视广告TVC"},{link:"/",txt:"产地创意工厂"}]},
                {link:"/app/works",txt:"案例展示",child:[{link:"/app/works",txt:"作品收集"}]},
                {link:"/app/news",txt:"新闻动态"},
                {link:"/",txt:"关于SINQ",child:[{link:"/",txt:"公司介绍"},{link:"/",txt:"企业文化"}]},
                {link:"/",txt:"我们的客户",child:[{link:"/",txt:"合作客户"}]},
                {link:"/",txt:"加入我们"},
                {link:"/",txt:"联系我们"}
            ],
            brands:new Array(24).fill(1)
        }
    }
})