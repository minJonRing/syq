var app = new Vue({
    el:"#scss",
    data () {
        return {
            year:[2014,2015,2016,2017,2018],
            list:[],
            isPhone:/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 1 : 0
        }
    },
    mounted(){
        $.ajax({
            url:"/app/getNews",
            type:"POST",
            success:(res)=>{
                this.list = res.data
            }
        })
    },
    methods:{
    }
})