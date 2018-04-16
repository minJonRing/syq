const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})

let db = new Schema({
    data:{type:Number}
})
let userModel = mongoose.model('User', user);
let dbModel = mongoose.model('Db', db);
module.exports = {user:userModel,db:dbModel};