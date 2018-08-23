var app = new Vue({
    el:"#app",
    data () {
        return {
            isShowShade:false,
            loop1:0,
            loop2:0,
            caseList:[
                    {link:"/",img:"url(/images/web/index/1.png)",txt:"CG及实拍影像"},
                    {link:"/",img:"url(/images/web/index/2.png)",txt:"虚拟影像互动展示"},
                    {link:"/",img:"url(/images/web/index/3.png)",txt:"数字演员"}
                ],
            caseH:0,
            courseList:[
                    {link:"/",title:"2014",sub:"dadsa",txt:"件大事就打算的撒是件大事就打算的撒是件大事就打算的撒是件大事就打算的撒是"},
                    {link:"/",title:"60",sub:"dadsa",txt:"件大事就打算的撒是"},
                    {link:"/",title:"300",sub:"dadsa",txt:"件大事就打大事就打算的撒算的撒是件大事就打算的撒是件大事就打算的撒是"},
                    {link:"/",title:"∞",sub:"dadsa",txt:"件大事就打算的撒是"},
                ],
            works:[
                    {link:"/",txt:"全部"},
                    {link:"/",txt:"三维产品动画"},
                    {link:"/",txt:"影视广告TVC"},
                    {link:"/",txt:"地产创意工厂"}
                ],
            worksList:[],
            newsList:[],
            client:new Array(14).fill({link:"/",img:"/images/web/loop.png"})
        }
    },
    mounted(){
        let WINDOW_H = window.innerHeight;
        let VIDEOH = WINDOW_H - 245;
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
        
        // 第一个参数 全部请求完成后执行的事件  第二个及以后的（请求的事件）
        this.bindAllAjAX(()=>{
            this.bindImgSuccess((l,arr)=>{
                if(l == arr.length){
                    $(".loding-bar span").css("width",`100%`);
                    $(".loding").hide()
                    $(".loding-bar").hide()
                }else{
                    let __ = Math.ceil(arr.length/l*100);
                    $(".loding-bar span").css("width",`${__}%`);
                }
            })
        },this.bindGetWorkList(),this.bindGetNewsList())
    },
    methods:{
        // 遮罩
        handleShowVideo(){
            this.isShowShade = this.isShowShade?false:true;
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
        async bindGetWorkList(){
            return new Promise((resolve,reject)=>{
                $.ajax({
                    url: "/app/getWork",
                    type: "POST",
                    success: (res) => {
                        this.worksList = res.data.slice(0,9);
                        if(res.code != 200){
                            reject(res)
                        }else{
                            resolve(res)
                        }
                    }
                })
            })
        },
        /**
         * 获取新闻列表
         */
        async bindGetNewsList(){
            return new Promise((resolve,reject)=>{ 
                $.ajax({
                    url: "/app/getNews",
                    type: "POST",
                    success: (res) => {
                        this.newsList = res.data.slice(0,9);
                        if(res.code != 200){
                            reject(res)
                        }else{
                            resolve(res)
                        }
                    }
                })
            })
        },
        /**
         * promise 整合ajax加载
         * fn 请求完成后执行的函数
         * obj 需要执行ajax的集合
         */
        async bindAllAjAX(fn,...obj){
            // 等待所有ajax执行完毕
            await Promise.all(obj).then((res)=>{fn?fn():'';})
            
        },
        /**
         * 判断图片是否加载完成
         * fn 图片全部加载完成后执行的函数
         * obj 图片所在的元素的位子
         */
        bindImgSuccess(fn,obj = document){
            let el = obj.querySelectorAll("img"),l = el.length,arr = [];
            for(let i of [...el]){
                let time = setInterval(()=>{
                    if(i.complete){
                        arr.push(1);
                        fn(l,arr);
                        clearInterval(time)
                    }
                    if(l == arr){
                        fn(l,arr);
                    }
                },100)
            }
        }
    }
})