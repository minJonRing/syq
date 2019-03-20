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

let user = [];
// 首页index
router.get('/three', async (ctx, next) => {
  await ctx.render('three', {
    title: 'Hello Koa 2!'
  })
})
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
// 作品详情页
router.get("/app/work/:id" ,async (ctx , next) => {
  await ctx.render("work", {
    title: 'Hello Koa 2!'
  })
}).post("/app/work",async (ctx,next) => {
  let msg,data;
  await new Promise((resolve,reject) =>{
    try {
      model.work.findOne({_id:ctx.request.body.id},function(err,db){
        if(!err){
          msg="查询成功!"
          data = db;
          resolve()
        }else{
          msg="查询失败!";
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

// 新闻资讯 news
router.get('/app/news', async (ctx, next) => {
  await ctx.render('news-list', {
    title: 'Hello Koa 2!'
  })
}).post("/app/news",async (ctx,next) => {
  let msg,data;
  await new Promise((resolve,reject) =>{
    try {
      model.news.findOne({_id:ctx.request.body.id},function(err,db){
        if(!err){
          msg="查询成功!"
          data = db;
          resolve()
        }else{
          msg="查询失败!";
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
// 新闻详情页
router.get('/app/news/:id', async (ctx, next) => {
  await ctx.render('news', {
    title: 'Hello Koa 2!'
  })
})
// 关于我们
router.get('/app/about', async (ctx, next) => {
  await ctx.render('about', {
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
//测试接口
router.get('/app/link', async (ctx, next) => {
  await ctx.render('ifram', {
    title: 'Hello Koa 2!'
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
          // domain:"ojoojooo.com",
          domain:"localhost",
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
// 获取作品列表
router.post("/app/getWork",async (ctx ,next)=>{
  let msg = "" , code = 0;
  let _db = "";
  await new Promise((resolve,reject)=>{
    try {
      model.work.find({},(err,db)=>{
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
// 按类型获取作品列表
router.post("/app/findOneWork",async(ctx,next)=>{
  await next()
  let msg = "",data = "";
  await new Promise((resolve,reject)=>{
    try {
      model.work.find({type:ctx.request.body.type},function(err,db){
        if(!err){
          msg = "查询成功!";
          data = db;
          resolve()
        }else{
          msg = "查询失败!";
          resolve()
        }
      })
    } catch (error) {
      msg = "系统错误";
      resolve()
    }
  })
  ctx.body = {code:200,msg:msg,data:data}
})
// 获取单一作品数据
router.post("/app/getOneWork",async(ctx,next)=>{
  let msg = "",data="";
  await new Promise((resolve,reject)=>{
    try {
      model.work.findOne({_id:ctx.request.body.id},function(err,db){
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
// 删除作品
router.post("/app/removeWork",async(ctx,next)=>{
  let msg = ""
  await new Promise((resolve,reject)=>{
    try {
      model.work.remove({_id:ctx.request.body.id},function(err,db){
        if(!err){
          msg = "删除成功!"
          resolve()
        }else{
          msg = "删除失败!"
          resolve()
        }
      })
    } catch (error) {
      msg = "系统错误!"
      resolve()
    }
    
  })
  ctx.body = {code:200,msg:msg}
})
// 删除新闻
router.post("/app/removeNews",async(ctx,next)=>{
  let msg = ""
  await new Promise((resolve,reject)=>{
    try {
      model.news.remove({_id:ctx.request.body.id},function(err,db){
        if(!err){
          msg = "删除成功!"
          resolve()
        }else{
          msg = "删除失败!"
          resolve()
        }
      })
    } catch (error) {
      msg = "系统错误!"
      resolve()
    }
    
  })
  ctx.body = {code:200,msg:msg}
})
// 上传封面
router.post("/app/upload/cover", async(ctx,next)=>{
  await next()
  let imgurl = [];
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(config.default._rootdir + "/public/upload/cover");
  form.keepExtensions = true;
  form.multiples = true;
  await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
        if (err) { throw err; resolve(imgurl) ;return; }
        let url = files.file.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
        imgurl.push(url)
        resolve(imgurl)
      })
  })
  let code = 0,msg = "";
  if(imgurl.length){
    code = 200;
    msg = "上传成功";
  }
  ctx.body = {code:code,msg:msg,data:imgurl}
})
// 上传图片
router.post("/app/upload/img", async(ctx,next)=>{
  await next()
  let imgurl = [];
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(config.default._rootdir + "/public/upload/cover");
  form.keepExtensions = true;
  form.multiples = true;
  await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
        if (err) { throw err; resolve(imgurl);return }
        console.log(files.imgs)
        // 用于重命名文件
        // let _name = files.imgs.name;
        // let newpath =  '/public/upload/'+_name;
        // await new Promise((resolve,reject)=>{
        //   fs.rename(files.imgs.path,config.default._rootdir+newpath,(err)=>{
        //     if(!err){
        //       resolve()
        //     }
        //   })
        // })
        // if (files.imgs.length) {
        //     for (img of files.imgs) {
        //         let url = img.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
        //         imgurl.push(url)
        //     }
        // } else {
        // let url = (config.default._rootdir+newpath).replace(/.+(public)/g,"");
        // 随机文件名
        if(Array.isArray(files.imgs)){
          for(let i in files.imgs){
            let url = files.imgs[i].path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
            imgurl.push(url)
          }
        }else{
          let url = files.imgs.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
          imgurl.push(url)
        }
        
        // }
        resolve(imgurl)
      })
  })
  let code = 0,msg = "",errno = 1;
  if(imgurl.length){
    code = 200;
    msg = "上传成功";
    errno = 0;
  }
  ctx.body = {code:code,msg:msg,errno:errno,data:imgurl}

})
// 上传/更新作品数据
router.post("/app/work/save",async (ctx,next)=>{
  let msg = "" ,code = 0;
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.multiples = true;
  await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
          if (err) { throw err; return }
          // 封面图片路径
          try {
            let option = {type:fields.type,title:fields.title,desc:fields.desc,cover:fields.cover,cont:fields.cont,video:fields.video};
            if(fields.id){
              model.work.update({_id:fields.id},option,(err,db)=>{
                if(!err){
                  msg = "更新成功!";
                  code = 200;
                  resolve()
                }
              })
            }else{
              model.work.create(option,(err,db)=>{
                if(!err){
                  msg = "保存成功!";
                  code = 200
                  resolve()
                }
              })
            }
          } catch (error) {
            msg = "保存失败!";
            code = 201;
            resolve()
          }
      })
  })
  ctx.body = {code:code,msg:msg}
})
// 上传/更新新闻数据
router.post("/app/news/save",async (ctx,next)=>{
  let msg = "" ,code = 0;
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(config.default._rootdir + "/public/upload");
  form.keepExtensions = true;
  form.multiples = true;
  await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
          if (err) { throw err; return }
          // 封面图片路径
          try {
            let option = {type:fields.type,title:fields.title,cover:fields.cover,cont:fields.cont,video:fields.video};
            if(fields.id){
              model.news.update({_id:fields.id},option,(err,db)=>{
                if(!err){
                  msg = "更新成功!";
                  code = 200;
                }else{
                  msg = "更新失败!";
                  code = 204;
                }
                resolve()
              })
            }else{
              model.news.create(option,(err,db)=>{
                if(!err){
                  msg = "保存成功!";
                  code = 200
                }else{
                  msg = "保存失败!";
                  code = 204;
                }
                resolve()
              })
            }
          } catch (error) {
            msg = "保存失败!";
            code = 201;
            resolve()
          }
      })
  })
  ctx.body = {code:code,msg:msg}
})
// 视频上传
router.post("/app/video",async(ctx,next)=>{
  let msg = "" ,code = 0,url;
  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(config.default._rootdir + "/public/video");
  form.keepExtensions = true;
  form.multiples = true;
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
  ctx.body = {code:code,msg:msg,url:url}
})

// 设置基本配置
router.post("/app/config",async(ctx,next)=>{
  let data  = ctx.request.body.config,msg = "";
  await new Promise((resolve,reject)=>{
    fs.writeFile(config.default._rootdir+"\\public\\set.config.js",data,"utf-8",(err,db)=>{
      if(!err){
        msg = "写入成功!";
        resolve()
      }else{
        msg = "写入失败!"
        resolve()
      }
    })
  }) 
  ctx.body = {code:200,msg:msg}
})
// 获取浏览数据
router.get("/getData",async (ctx,next)=>{
  // await new Promise((resolve,reject)=>{
  //   new model.db({
  //     data:ctx.query.a
  //   }).save()
  //   resolve()
  // })
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
        console.log(isUid,view,url);
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
