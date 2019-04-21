const router = require('koa-router')()
const crypto = require("crypto")
const Redis = require("ioredis")
const formidable = require('formidable')
const path  = require("path")
const fs = require("fs")

const config =  require("../config.js")
const fn = require("./upload.js")

const model  = require('../schema/user.js')
const redis = new Redis({
  host : '127.0.0.1',//安装好的redis服务器地址
  port : 6379,　//端口
  ttl : 60 * 60 * 72,//过期时间
  db: 0
})

// 前段页面

// 首页index
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '杭州思漫奇'
  })
})
// 作品页 works
router.get('/app/works', async (ctx, next) => {
  await ctx.render('works-list', {
    title: '思漫奇作品'
  })
})
// 作品详情页
router.get("/app/work/:id" ,async (ctx , next) => {
  await ctx.render("work", {
    title: '思漫奇作品'
  })
})
// 新闻资讯 news
router.get('/app/news', async (ctx, next) => {
  await ctx.render('news-list', {
    title: '思漫奇资讯'
  })
})
// 新闻详情页
router.get('/app/news/:id', async (ctx, next) => {
  await ctx.render('news', {
    title: '思漫奇资讯'
  })
})
// 关于我们
router.get('/app/about', async (ctx, next) => {
  await ctx.render('about', {
    title: '关于我们'
  })
})
//我的客户 client
router.get('/app/client', async (ctx, next) => {
  await ctx.render('my-client', {
    title: '我的客户'
  })
})
//加入我们 join we
router.get('/app/joinwe', async (ctx, next) => {
  await ctx.render('join-we', {
    title: '加入我们'
  })
})
//联系我们 contact we
router.get('/app/contactwe', async (ctx, next) => {
  await ctx.render('contact-we', {
    title: '联系我们'
  })
})
// 手机测试
router.get('/app/isa', async (ctx, next) => {
  await ctx.render('vue-index', {
    title: 'app'
  })
})
// admin 后端接口
// 后端登录界面
router.get("/app/admin",async (ctx,next) => {
  try {
    let uid = JSON.parse(ctx.cookies.get("angel")).a;
    const isUid = await new Promise((resolve,reject)=>{
      redis.get(uid).then((db,err)=>{
        if(!err && db){
          resolve(true)
        }else{
          resolve(false)
        }
      })
    })
    if(isUid){
      await ctx.redirect("/app/admin/home")
    }else{
      await ctx.render("admin/login")
    }
  } catch (error) {
    await ctx.render("admin/login")
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
          // domain:"hzsinq.com",
          domain:"ojoojooo.com",
          // domain:"localhost",
          path:"/",
          maxAge:72*60*60*1000,
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
router.get("/app/admin/home",isUser('admin/index','/app/admin'))
router.get("/app/admin/tqr", async (ctx, next) => {
  await ctx.render('admin/index', {
    title: 'app'
  })
})
// router.get("/app/main",isUser(view,url))
// 测试注册用户   可删除////////////////////////////////
router.post("/get/user",async (ctx,next) =>{
  let data="",msg="";
  try {
    await new Promise((resolve,reject)=>{
      model.user.find({},function(err,db){
        if(!err){
          msg = "have";
          data = db;
        }else{
          msg = "have";
          data = err
        }
        resolve()
      })
    })
  } catch (error) {
    msg = "error"
  }
  ctx.body = {code:200,msg:msg,data:data}
})
router.post("/save/user",async (ctx,next) =>{
  let data="",msg="";
  try {
    await new Promise((resolve,reject)=>{
      model.user({
        username:"admin",
        password:hash("111111")
      }).save(function(err,db){
        if(!err){
          msg = "have"
          data = db;
        }else{
          msg = "no";
          data = err;
        }
        resolve()
      })
    })
  } catch (error) {
    msg = "error"
  }
  ctx.body = {code:200,msg:msg,data:data}
})
// ////////////////////////////////////////////
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
// 获取新闻列表
router.post("/app/getNews",async (ctx ,next)=>{
  let msg = "" , code = 0;
  let _db = "";
  await new Promise((resolve,reject)=>{
    try {
      model.news.find({},(err,db)=>{
        if(!err){
          _db = db;
          msg = "查询成功!";
          code = 200;
          resolve()
        }else{
          msg = "查询失败!";
          code = 201;
          resolve()
        }
      })
    } catch (error) {
      msg = "查询失败!";
      code = 201;
      resolve()
    }
  }) 
  ctx.body = {code:code,msg:msg,data:_db}
})
// 获取单一新闻数据
router.post("/app/getOneNews",async(ctx,next)=>{
  let msg = "",data="";
  await new Promise((resolve,reject)=>{
    try {
      model.news.findOne({_id:ctx.request.body.id},function(err,db){
        if(!err){
          msg = "查询成功!";
          data = db;
          resolve()
        }else{
          msg = "查询失败!"
          resolve()
        }
      })
    } catch (error) {
      msg = "系统错误!"
      resolve()
    }
  })
  ctx.body = {code:200,msg:msg,data:data}
})
// 视频上传
router.post("/app/video",async(ctx,next)=>{
  let msg = "" ,code = 0,url = "";
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(config.default._rootdir + "/public/video");
  form.keepExtensions = true;
  form.multiples = true;
  form.maxFieldsSize = 600 * 1024 * 1024;
  try {
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
          if (err) { throw err; return }
          // 封面图片路径
          console.log(files.video)
          url = files.video ? files.video.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/'):"";
          resolve()
      })
    })
    if(url){
      code = 200;
      msg = "上传成功";
    }
  } catch (error) {
    code = 200;
    msg = "上传失败";
  }
  ctx.body = {code:code,msg:msg,url:url}
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
        // await ctx.render(view)
        await ctx.redirect(url)
      }
    }
}
module.exports = router
