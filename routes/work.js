const router = require('koa-router')()
const model  = require('../schema/user.js')
// 上传/更新项目数据
router.post("/app/project/create",async (ctx,next)=>{
    let msg = "" , code = 0, req = ctx.request.body;
    await new Promise((resolve, reject) => {
        try {
            let option = {
                type:req.type,
                title:req.title,
                desc:req.desc,
                isLong:req.isLong,
                isSwitch:req.isSwitch,
                cover:req.cover,
                cont:req.cont,
                video:req.video
            };
            if(req.id){
                model.work.update({_id:req.id},option,(err,db)=>{
                    if(!err){
                        msg = "更新成功!";
                        code = 200;
                        resolve()
                    }else{
                        msg = "更新失败!";
                        code = 201;
                        resolve()
                    }
                })
            }else{
                model.work.create(option,(err,db)=>{
                    if(!err){
                        msg = "保存成功!";
                        code = 200
                        resolve()
                    }else{
                        msg = "保存失败!";
                        code = 201;
                        resolve()
                    }
                })
            }
        } catch (error) {
            msg = "操作失败!";
            code = 201;
            resolve()
        }
    })
    ctx.body = {code:code,msg:msg}
})
// 获取项目列表
router.get("/app/project/list",async (ctx ,next)=>{
    let msg = "" , code = 0;
    const data = await new Promise((resolve,reject)=>{
        try {
            model.work.find({},(err,db)=>{
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
// 获取项目详情
router.get("/app/project/edit",async(ctx,next)=>{
    let msg = "",code = 0;
    const data = await new Promise((resolve,reject)=>{
        try {
            model.work.findOne({_id:ctx.request.query.id},function(err,db){
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
            msg = "请求超时!"
            code = 201;
            resolve([])
        }
    })
    ctx.body = {code:code,msg:msg,data:data}
})
// 删除项目
router.post("/app/project/remove",async(ctx,next)=>{
    let msg = "",code = 0;
    await new Promise((resolve,reject)=>{
        try {
            model.work.remove({_id:ctx.request.body.id},function(err,db){
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
