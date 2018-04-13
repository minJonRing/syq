const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true}
})
let userModel = mongoose.model('User', user);
module.exports = {user:userModel};