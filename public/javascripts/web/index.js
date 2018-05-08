var app = new Vue({
    el:"#app",
    data () {
        return {
            nav:[
                {link:"/",txt:"SINQ业务",child:[{link:"/",txt:"三维产品动画"},{link:"/",txt:"影视广告TVC"},{link:"/",txt:"产地创意工厂"}]},
                {link:"/app/works",txt:"案例展示",child:[{link:"/app/works",txt:"作品收集"}]},
                {link:"/app/news",txt:"新闻动态"},
                {link:"/",txt:"关于SINQ",child:[{link:"/",txt:"公司介绍"},{link:"/",txt:"企业文化"}]},
                {link:"#",txt:"我们的客户",child:[{link:"/app/client",txt:"合作客户"}]},
                {link:"/app/joinwe",txt:"加入我们"},
                {link:"/app/contactwe",txt:"联系我们"}
            ],
            loop1:0,
            loop2:0,
            loopmid:0,
            caseList:[
                    {link:"/",img:"url(http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg)",txt:"CG及实拍影像"},
                    {link:"/",img:"url(http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic2.jpg)",txt:"虚拟影像互动展示"},
                    {link:"/",img:"url(http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic3.jpg)",txt:"数字演员"}
                ],
            caseH:0,
            courseList:[
                    {link:"/",title:"aa",sub:"dadsa",txt:"件大事就打算的撒是"},
                    {link:"/",title:"aa",sub:"dadsa",txt:"件大事就打算的撒是"},
                    {link:"/",title:"aa",sub:"dadsa",txt:"件大事就打算的撒是"},
                    {link:"/",title:"aa",sub:"dadsa",txt:"件大事就打算的撒是"},
                ],
            works:[
                    {link:"/",txt:"全部"},
                    {link:"/",txt:"三维产品动画"},
                    {link:"/",txt:"影视广告TVC"},
                    {link:"/",txt:"地产创意工厂"}
                ],
            worksList:[
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                    {link:"/",title:"测试文本",txt:"测试文本测试文本测试文本",img:"http://www.bitone.com/template/1/default/_files/cn/img/home/busineess-pic1.jpg"},
                ],
            client:[
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                    {link:"/",img:"/images/web/loop.png"},
                ]
        }
    },
    mounted(){
        let WINDOW_H = window.innerHeight;
        let VIDEOH = WINDOW_H - 265;
        let VIDEOW = VIDEOH/.35
        document.querySelector("video").height = VIDEOH;
        document.querySelector("video").width = VIDEOW;
        this.caseH = window.innerWidth/4/.75;
        window.onresize = ()=>{
            this.caseH = window.innerWidth/4/.75;
        }
        setTimeout(() => {
        var L = $(".my-client-list1 div").width() * $(".my-client-list1 div").length;
        var _L = $(".my-client-list2 div").width() * $(".my-client-list2 div").length;
        this._loop(".my-client-list1",L,'left')
        this._loop(".my-client-list2",_L,'right')
        }, 1);
        
        
    },
    methods:{
        getMessage(){
            this.$axios.post('/app/getMessage',{}).then((res)=>{
                this.setI()
            })
        },
        _loop(db,L,type){
            if(L > $("body").width()){
                var _x = type === "left"? -(this.loop1++):this.loop2++;
                $(db).css("transform",'matrix(1.05, 0, 0, 1.05, '+ _x +', 0)');
                if(type === "left"){
                if(L/2 == Math.abs(this.loop1)){
                    this.loop1 = 0;
                }
                }else{
                if(L/2 == Math.abs(this.loop2)){
                    this.loop2 = 0;
                }
                }
                
                setTimeout(() => {
                this._loop(db,L,type)
                }, 30);
            }else{
                
            }
        }
    }
})