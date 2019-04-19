const router = require('koa-router')()
const formidable = require('formidable')
const path  = require("path")
const config =  require("../config.js")
// 上传封面
router.post("/app/upload/cover", async(ctx,next)=>{
    await next()
    let imgurl = [];
    let form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(config.default._rootdir + "/public/upload/cover");
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.maxFileSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.keepExtensions = true;
    form.multiples = true;
    await new Promise((resolve, reject) => {
        try {
            form.parse(ctx.req, (err, fields, files) => {
                if (err) { throw err; resolve(imgurl) ;return; }
                let url = files.file.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
                imgurl.push(url)
                resolve(imgurl)
            })
        } catch (error) {
        
        }
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
  form.uploadDir = path.join(config.default._rootdir + "/public/upload/img");
  form.keepExtensions = true;
  form.multiples = true;
  await new Promise((resolve, reject) => {
      form.parse(ctx.req, async(err, fields, files) => {
        if (err) { throw err; resolve(imgurl);return }
        if(Array.isArray(files.imgs)){
          for(let i in files.imgs){
            let url = files.imgs[i].path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
            imgurl.push(url)
          }
        }else{
          let url = files.imgs.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
          imgurl.push(url)
        }
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
// 上传图片
// router.post("/app/upload/img", async(ctx,next)=>{
//   await next()
//   let imgurl = [];
//   let form = new formidable.IncomingForm();
//   form.encoding = 'utf-8';
//   form.uploadDir = path.join(config.default._rootdir + "/public/upload/cover");
//   form.keepExtensions = true;
//   form.multiples = true;
//   await new Promise((resolve, reject) => {
//       form.parse(ctx.req, async(err, fields, files) => {
//         if (err) { throw err; resolve(imgurl);return }
//         // 用于重命名文件
//         // let _name = files.imgs.name;
//         // let newpath =  '/public/upload/'+_name;
//         // await new Promise((resolve,reject)=>{
//         //   fs.rename(files.imgs.path,config.default._rootdir+newpath,(err)=>{
//         //     if(!err){
//         //       resolve()
//         //     }
//         //   })
//         // })
//         // if (files.imgs.length) {
//         //     for (img of files.imgs) {
//         //         let url = img.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
//         //         imgurl.push(url)
//         //     }
//         // } else {
//         // let url = (config.default._rootdir+newpath).replace(/.+(public)/g,"");
//         // 随机文件名
//         if(Array.isArray(files.imgs)){
//           for(let i in files.imgs){
//             let url = files.imgs[i].path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
//             imgurl.push(url)
//           }
//         }else{
//           let url = files.imgs.path.replace(/.+(public)/g,"").replace(/(\\)/g, '/');
//           imgurl.push(url)
//         }
        
//         // }
//         resolve(imgurl)
//       })
//   })
//   let code = 0,msg = "",errno = 1;
//   if(imgurl.length){
//     code = 200;
//     msg = "上传成功";
//     errno = 0;
//   }
//   ctx.body = {code:code,msg:msg,errno:errno,data:imgurl}

// })
module.exports = router;