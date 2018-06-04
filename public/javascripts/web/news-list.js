var app = new Vue({
    el:"#scss",
    data () {
        return {
            year:[2014,2015,2016,2017,2018],
            isPhone:/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 1 : 0,
            works:[],
            list:[],
            pages:0,
            page:0
        }
    },
    mounted(){
        // $.ajax({
        //     url:"/app/getNews",
        //     type:"POST",
        //     success:(res)=>{
        //         this.list = res.data;
        //         this.pages = res.data.length;
        //         this.filter(this.list.slice(0,9))
        //     }
        // })
    },
    methods:{
    }
})