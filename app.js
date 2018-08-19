const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs')
const path = require("path")
const ejs = require('ejs')
const mongoose = require("mongoose")
const session = require("koa-session-redis");
const staticCache = require('koa-static-cache')
// var WebSocketServer = require('ws').Server,
// wss = new WebSocketServer({ port: 8181 });
// wss.on('connection', function (ws) {
//     console.log('client connected');
//     ws.on('message', function (message) {
//         console.log(message);
//     });
// });
// const MongooseStore = require("koa-session-mongoose");


let db = mongoose.connect("mongodb://localhost:27017/syq");
mongoose.connection.on("open",function(){
  console.log("mongodb connection success!")
})


const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(session({
  store:{
    host:"127.0.0.1",
    port:6379,
    ttl:10
  }
},app))


app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// app.use(staticCache(path.join(__dirname, '/public'), {
//   maxAge: 365 * 24 * 60 * 60
// }))

app.use(views(__dirname + '/views', {
  map : {html:'ejs'}
}))
// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
