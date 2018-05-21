var app = new Vue({
    el:"#app",
    data () {
        return {
            
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
            worksList:[],
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
        
        this.bindGetWorkList()
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
        },
        /**
         * 获取作品列表
         */
        bindGetWorkList(){
            $.ajax({
                url: "/app/getWork",
                type: "POST",
                success: (res) => {
                    this.worksList = res.data.slice(0,9);
                }
            })
        }
    }
})