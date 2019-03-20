const router = require('koa-router')()
const model  = require('../schema/user.js')


// 上传/更新新闻数据
router.post("/app/informa/create",async (ctx,next)=>{
    let msg = "" ,code = 0 ,req = ctx.request.body;
    await new Promise((resolve, reject) => {
        // 封面图片路径
        try {
            let option = {type:req.type,title:req.title,cover:req.cover,cont:req.cont,video:req.video};
            if(req.id){
                model.news.update({_id:req.id},option,(err,db)=>{
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
    ctx.body = {code:code,msg:msg}
})
// 获取新闻列表
router.get("/app/informa/list",async (ctx ,next)=>{
    let msg = "" , code = 0;
    const data = await new Promise((resolve,reject)=>{
        try {
            model.news.find({},(err,db)=>{
            if(!err){
                msg = "查询成功!";
                code = 200;
                resolve(db)
            }else{
                msg = "查询失败!";
                code = 201;
                resolve([])
            }
            })
        } catch (error) {
            msg = "查询失败!";
            code = 201;
            resolve([])
        }
    }) 
    ctx.body = {code:code,msg:msg,data:data}
})
// 获取单一新闻数据
router.get("/app/informa/edit",async(ctx,next)=>{
    let msg = "",code = 0;
    const data = await new Promise((resolve,reject)=>{
        try {
            model.news.findOne({_id:ctx.request.query.id},function(err,db){
            if(!err){
                msg = "查询成功!";
                code = 200;
                resolve(db)
            }else{
                msg = "查询失败!"
                code = 201;
                resolve([])
            }
            })
        } catch (error) {
            msg = "系统错误!"
            code = 201;
            resolve([])
        }
    })
    ctx.body = {code:code,msg:msg,data:data}
})
// 删除新闻
router.post("/app/informa/remove",async(ctx,next)=>{
    let msg = "", code = 0;
    await new Promise((resolve,reject)=>{
        try {
            model.news.remove({_id:ctx.request.body.id},function(err,db){
            if(!err){
                msg = "删除成功!"
                code = 200;
                resolve()
            }else{
                msg = "删除失败!"
                code = 201;
                resolve()
            }
            })
        } catch (error) {
            msg = "系统错误!"
            code = 201;
            resolve()
        }
    })
    ctx.body = {code:code,msg:msg}
})
module.exports = router;