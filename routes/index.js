const router = require('koa-router')()
const crypto = require("crypto")
const Redis = require("ioredis")

const model  = require('../schema/user.js')
const redis = new Redis({
  host : '127.0.0.1',//安装好的redis服务器地址
  port : 6379,　//端口
  ttl : 10,//过期时间
  db: 0
})

let user = [];

// 前段页面
// 首页index
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
// 作品页 works
router.get('/app/works', async (ctx, next) => {
  await ctx.render('works-list', {
    title: 'Hello Koa 2!'
  })
})
// 新闻资讯 news
router.get('/app/news', async (ctx, next) => {
  await ctx.render('news-list', {
    title: 'Hello Koa 2!'
  })
})
//我的客户 client
router.get('/app/client', async (ctx, next) => {
  await ctx.render('my-client', {
    title: 'Hello Koa 2!'
  })
})
//加入我们 join we
router.get('/app/joinwe', async (ctx, next) => {
  await ctx.render('join-we', {
    title: 'Hello Koa 2!'
  })
})
//联系我们 contact we
router.get('/app/contactwe', async (ctx, next) => {
  await ctx.render('contact-we', {
    title: 'Hello Koa 2!'
  })
})
// admin 后端接口
// 后端登录界面
router.get("/app/admin",async (ctx,next) => {
  let isUid;
  try {
    let uid = JSON.parse(ctx.cookies.get("angel")).a;
    await new Promise((resolve,reject)=>{
      redis.get(uid).then((db,err)=>{
        if(!err && db){
          resolve(isUid = true)
        }else{
          resolve(isUid = false)
        }
      })
    })
    if(isUid){
      await ctx.redirect("/app/main")
    }else{
      await ctx.render("admin")
    }
  } catch (error) {
    await ctx.render("admin")
  }
})
// 后端登录接口
router.post("/app/admin",async (ctx,next)=>{
  let username = ctx.request.body.username;
  let password = ctx.request.body.password;
  let body = {};
  await new Promise((resolve,reject)=>{
    model.user.findOne({username:username},(err,db)=>{
      if(!err && db &&  hash(password) === db.password){
        ctx.cookies.set("angel",JSON.stringify({a:username,b:db._id}),{
          domain:"localhost",
          path:"/",
          maxAge:30*24*60*60*1000,
          expires:new Date(),
          httpOnly:false,
          overwrite:false
        })
        redis.set(username,db._id)
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
router.get("/app/main",isUser('main','/app/admin'))


// 退出登录
router.get("/app/logout",async (ctx,next)=>{
  let isUid;
  try {
    let uid = JSON.parse(ctx.cookies.get("angel")).a;
    await new Promise((resolve,reject)=>{
      redis.del(uid);
      resolve();
    })
    ctx.body = {code:200,msg:"success"}
  } catch (error) {
    ctx.body = {code:204,msg:"error"}
  }
})
// 获取浏览数据
router.get("/getData",async (ctx,next)=>{
  await new Promise((resolve,reject)=>{
    new model.db({
      data:ctx.query.a
    }).save()
    resolve()
  })
})

// 加密密码
function hash(data){
  let md5 = crypto.createHash("md5");
  return md5.update(data).digest("hex");
}

// 用户权限控制
function isUser(view,url){
  return async(ctx,next)=>{
          let isUid;
          try {
            let uid = JSON.parse(ctx.cookies.get("angel")).a;
            await new Promise((resolve,reject)=>{
              redis.get(uid).then((db,err)=>{
                if(!err && db){
                  resolve(isUid = true)
                }else{
                  resolve(isUid = false)
                }
              })
            })
            if(isUid){
              await ctx.render(view)
            }else{
              await ctx.redirect(url)
            }
          } catch (error) {
            await ctx.redirect(url)
          }
        }
}
module.exports = router
