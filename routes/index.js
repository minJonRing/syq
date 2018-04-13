const router = require('koa-router')()
const crypto = require("crypto")

const model  = require('../schema/user.js')

let user = [];

// 前段页面
router.get('/', async (ctx, next) => {
  console.log(ctx.cookies.get("angel"))
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
// admin 后端接口
// 后端登录界面
router.get("/app/admin",async (ctx,next) => {
  console.log(ctx.cookies.get("angel"))
  console.log(user)
  if(ctx.cookies.get("angel")){
    for(let i in user){
      if(user[i] && user[i] == ctx.cookies.get("angel")){
        await ctx.redirect('/app/main')
        return ;
      }
    }
    await ctx.render("admin")
  }else{
    await ctx.render("admin")
  }
})
// 后端登录接口
router.post("/app/admin",async (ctx,next)=>{
  console.log(ctx.cookies.get("angel"))
  const {session} = ctx;
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let body = {};
  await new Promise((resolve,reject)=>{
    model.user.findOne({username:username},(err,db)=>{
      if(!err && db &&  hash(password) === db.password){
        user.push(db._id);
        ctx.cookies.set("angel",db._id,{
          domain:"localhost",
          path:"/",
          maxAge:30*24*60*60*1000,
          expires:new Date(),
          httpOnly:false,
          overwrite:false
        })
        body = {code:200,msg:"登入成功",data:ctx.session}
        resolve()
      }else{
        body = {code:204,msg:"账号密码错误",data:err}
        resolve()
      }
    })
  })

  ctx.body = body;


})
// 后端主界面 
router.get("/app/main",async(ctx,next)=>{
  console.log(ctx.cookies.get("angel"))
  await ctx.render("main")
})


// 加密密码
function hash(data){
  let md5 = crypto.createHash("md5");
  return md5.update(data).digest("hex");
}

module.exports = router
