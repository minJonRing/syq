var app = new Vue({
    el:"#app",
    data () {
        return {
            brands:new Array(24).fill(1),
            isPhone:/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? 1 : 0
        }
    }
})