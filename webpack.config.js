const webpack = require("webpack")

console.log(__dirname)
module.exports = {
    entry:__dirname + "/public/react/index/index.js",
    output:{
        path:__dirname+"/public/build",
        filename:"react-index.js"
    },
    module:{
        rules:[{
            test:/(\.jsx|\.js)$/,
            loader:"babel-loader",
            exclude:"/node_modules/",
            query:{
                presets: ['es2015','react']
            }
        }]
    }
}
