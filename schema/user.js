const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

let work = new Schema({
    type:{type:String},
    title:{type:String,required:true},
    cover:{type:String,required:true},
    cont:{type:String,required:true},
    video:{type:String},
    outVideo:{type:String},
    sort:{type:Number,default:99},
    isLong:{type:Boolean,default: false},
    isSwitch:{type:Boolean,default: false},
    createtime:{type: Date,default: Date.now},
    browse:{type:Number,default:0}
})

let news = new Schema({
    type:{type:String},
    title:{type:String,required:true},
    cover:{type:String,required:true},
    cont:{type:String,required:true},
    video:{type:String},
    createtime:{type: Date,default: Date.now},
    browse:{type:Number,default:0}
})
let userModel = mongoose.model('User', user);
let workModel = mongoose.model('Work', work);
let newsModel = mongoose.model('News', news);
module.exports = {user:userModel,work:workModel,news:newsModel};