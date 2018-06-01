var app = new Vue({
    el:"#scss",
    data: {
        isPhone:/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 1 : 0
    },
    mounted(){
    },
    methods:{
    }
})