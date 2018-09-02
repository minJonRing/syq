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
            course:[
                {time:'2015',text:"虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示"},
                {time:'2016',text:"虚拟影像互动展示"},
                {time:'2017',text:"虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示"},
                {time:'2018',text:"虚拟影像互动展示虚拟影像互动展示虚拟影像互动展示"},
                {time:'未来',text:"虚拟影像互动展示虚拟影像互动展示"}
            ],
            works:[
                    {link:"/",txt:"全部"},
                    {link:"/",txt:"三维产品动画"},
                    {link:"/",txt:"影视广告TVC"},
                    {link:"/",txt:"地产创意工厂"}
                ],
            // workName:['work-item-left','work-item-right','work-item-left','work-item-right work-item-mid','work-item-left','work-item-mid','work-item-left'],
            workH:0,
            worksList:[],
            newsList:[],
            client:new Array(14).fill({link:"/",img:"/images/web/loop.png"})
        }
    },
    mounted(){
        let WINDOW_H = window.innerHeight;
        let VIDEOH = WINDOW_H - 277;
        let VIDEOW = VIDEOH/.35
        document.querySelector("video").height = VIDEOH;
        document.querySelector("video").width = VIDEOW;
        // this.caseH = window.innerWidth/4/.75;
        this.caseH = VIDEOH;
        window.onresize = ()=>{
            this.caseH = VIDEOH;
        }
        setTimeout(() => {
            var L = $(".my-client-list1 div").width() * $(".my-client-list1 div").length;
            var _L = $(".my-client-list2 div").width() * $(".my-client-list2 div").length;
            this._loop(".my-client-list1",L,'left')
            this._loop(".my-client-list2",_L,'right')
        }, 500);
        
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

                let workH = $(".works-list a").height();
                this.workH = workH;
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
                        let db = res.data.sort((a,b)=>{
                            return new Date(a.createtime) < new Date(b.createtime)?1:-1;
                        })
                        this.worksList = db.slice(0,7);
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