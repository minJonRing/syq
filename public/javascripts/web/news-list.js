var app = new Vue({
    el:"#app",
    data () {
        return {
            nav:set_config.header,
            year:[2014,2015,2016,2017,2018],
            list:[
                {link:"1",url:this.img,title:"aa-ssss",time:"2017-08-22",txt:this.txt},
                {link:"3",url:this.img,title:"aa-ssss",time:"2017-08-22",txt:this.txt},
                {link:"2",url:this.img,title:"是对啥的驾驶就嗲三角地啊手",time:"2017-08-22",txt:this.txt},
                {link:"4",url:this.img,title:"短时",time:"2017-08-22",txt:this.txt},
                {link:"5",url:this.img,title:"aa-ssss",time:"2017-08-22",txt:this.txt}
            ]
        }
    },
    mounted(){
        
        var img = "http://www.bitone.com/uploads/1/image/public/201805/20180507112728_47vmh2c8qv.jpg"
        var ttx = "大家撒短时建档立卡撒娇第六届按时电力建设当打萨达萨达是大大的老师打脸萨的,的骄傲实力的刷卡机的 拉屎的拉升打的 大家拉萨短时ad"
        for(let i in this.list){
            this.list[i].url =  img
            this.list[i].txt =  ttx
        }
    },
    methods:{
    }
})