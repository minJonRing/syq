const webpack = require("webpack")

module.exports = {
    entry:__dirname + "/public/react/newslist/index.js",
    output:{
        path:__dirname+"/public/build",
        filename:"react-news.js"
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
