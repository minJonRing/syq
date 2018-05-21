var app = new Vue({
    el:"#app",
    data: {
        isSwitch:false,
        jobInfo:[
            {url:"/",title:"啦啦啦",txt:['在BITONE','作品质量而倍感自豪','的作品质量而倍感自豪','质量而倍感自豪']},
            {url:"/",title:"啦啦啦",txt:['在BITONE','作品质量而倍感自豪','的作品质量而倍感自豪','质量而倍感自豪']},
            {url:"/",title:"啦啦啦",txt:['在BITONE','作品质量而倍感自豪','的作品质量而倍感自豪','质量而倍感自豪']}
        ],
        jobs:[
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["111111","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["222222","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]},
            {name:"aa",department:"11",type:"all",address:"22",intro:["dasdsad","saasd","dsad","dweq"],skill:["dada","dasda"]}
        ],
        intro:[],
        skill:[]
    },
    mounted(){
        $('body').on("click",()=>{
            this.isSwitch = false;
        })
    },
    methods:{
        bindJob(event,db){
            this.isSwitch = true;
            this.intro = db.intro;
            this.skill = db.skill;
        }
    }
})