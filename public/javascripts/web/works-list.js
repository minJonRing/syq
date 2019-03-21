var app = new Vue({
    el:"#app",
    data:{
        options:[],
        init:[],
        list:[],
        nowList:[],
        // 
        type:0,
        total:1,
        page:1
    },
    mounted(){
        this.options = set_config.work_type;
        $.ajax({
            url: "/app/project/list",
            type: "GET",
            success: (res) => {
                this.init = res.data;
                this.list = [...this.init];
                this.handleFilter();
            }
        })
        
    },
    methods:{
        handleFilter(){
            let arr = [],h = [], l = [],db = [],ind = 0;
            if(this.type == 0){
                arr = this.init;
            }else{
                for(let i in this.init){
                    if(this.init[i].type == this.type){
                        arr.push(this.init[i])
                    }
                }
            }
            for(let i in arr){
                if(arr[i].isLong){
                    l.push(arr[i])
                }else{
                    h.push(arr[i])
                }
            }
            for(let i in arr){
                let el = h[i-ind];
                if( (i-0+1)%5 == 0 ){
                    if(l[ind]){
                        el = l[ind];
                        ind++;
                    }
                }
                db.push(el);
            }
            this.list = db;
            this.total = Math.ceil(arr.length/5);
            this.nowList = this.list.slice(0,this.page*5);
            this.page++;
        },
        bindLodingMore(){
            if(this.page <= this.total){
                this.nowList = this.list.slice(0,this.page*5);
                this.page++;
            }
        },
        //按类型查找
        handleAjaxType(e,type){
            this.type = type;
            this.page = 1;
            this.handleFilter()
        }
    }
})

