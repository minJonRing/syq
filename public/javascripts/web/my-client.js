var app = new Vue({
    el:"#app",
    data () {
        return {
            nav:set_config.header,
            brands:new Array(24).fill(1)
        }
    }
})