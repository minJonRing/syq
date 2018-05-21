var app = new Vue({
    el:"#app",
    data () {
        return {
            nav:set_config.header,
            year:[2014,2015,2016,2017,2018],
            list:[]
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