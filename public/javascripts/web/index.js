var app = new Vue({
    el:"#app",
    data () {
        return {
            year:"",
            isSafiri:false,
            isShowShade:false,
            loop1:0,
            loop2:0,
            caseList:[
                    {link:"/",img:"url(/images/web/index/1.png)",txt:"三维产品动画"},
                    {link:"/",img:"url(/images/web/index/2.png)",txt:"影视广告TV"},
                    {link:"/",img:"url(/images/web/index/3.png)",txt:"创意工厂"},
                    {link:"/",img:"url(/images/web/index/4.png)",txt:"ABOUT ME"}
                ],
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
            workH:0,
            worksList:[],
            newsList:[],
            client:[{img:""}],
            // window H
            windowH:0
        }
    },
    mounted(){
        let _arr  = [];
        for(let i in new Array(27).fill(1)){
            _arr.push({img:"/images/web/logo/"+(i-0+1)+".png"})
        }
        this.client = _arr;
        // 判断浏览器
        this.isSafiri = /^(?=.Safari)(?!.Chrome)/.test(navigator.userAgent);
        // 
        this.windowH = window.innerHeight;

        setTimeout(() => {
            var L = $(".my-client-list1 div").width() * $(".my-client-list1 div").length;
            var _L = $(".my-client-list2 div").width() * $(".my-client-list2 div").length;
            this._loop(".my-client-list1",L,'left')
            this._loop(".my-client-list2",_L,'right')
        }, 500);
        // 设置年份
        let time = new Date();
        this.year = time.getFullYear();
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
                    url: "/app/project/list",
                    type: "GET",
                    success: (res) => {
                        let db = res.data.sort((a,b)=>{
                            return new Date(a.createtime) < new Date(b.createtime)?1:-1;
                        })
                        let H = document.querySelector(".works").clientWidth / 3 * .5625 * 2;
                        let _filter = [],filter = [], sort = [], arr = [];
                        // let arr = [], h = [], l = []; ind = 0;
                        // for(let i in db){
                        //     if(db[i].isLong){
                        //         l.push(db[i])
                        //     }else{
                        //         h.push(db[i])
                        //     }
                        // }
                        // for(let i in db){
                        //     let el = h[i - ind];
                        //     if((i-0+1)%5 == 0){
                        //         if(l[ind]){
                        //             el = l[ind];
                        //             ind++;
                        //         }
                        //     }
                        //     arr.push(el);
                        // }
                        for(let i in db){
                            if(db[i].type == 1){
                                _filter.push(db[i])
                            }
                        }
                        filter = _filter.slice(0,21);
                        sort = filter.sort((x,y)=>{
                            if(x.sort > y.sort){
                                return 1;
                            }else if(x.sort < y.sort){
                                return -1;
                            }else{
                                return 0;
                            }
                        })
                        for(let i in sort){
                            let ind = Math.floor(i / 7);
                            if(!arr[ind]){
                                arr[ind] = []
                            }
                            arr[ind].push(sort[i])
                        }
                        for(let i in arr){
                            let _arr = arr[i];
                            for(let j in _arr){
                                let num = j % 7;
                                let cla = "";
                                if(num == 0 || num == 2 || num == 4){
                                    cla = "active1";
                                }else if(num == 1 || num == 3){
                                    cla = "active2";
                                }
                                if(num == 3 || num == 5){
                                    _arr[j].h = H + 'px';
                                }
                                _arr[j].cla = cla;
                            }
                        }
                        this.worksList = arr;
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
                    url: "/app/informa/list",
                    type: "GET",
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