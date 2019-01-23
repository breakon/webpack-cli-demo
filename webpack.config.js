let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');//代码片段打包
let CleanWebpackPlugin = require('clean-webpack-plugin'); 
let webpack= require('webpack');
module.exports={
    entry:'./src/index.js', //人口
    output:{
        // 出口
        // filename:'build.js',//重新取名字
        filename:'build.[hash:8].js',
        path:path.resolve('./build')//必须是一个绝对路径
    },
    devServer:{
        contentBase:'./build',
        port:10086,
        compress:true,// 服务器压缩
        open:true,
        hot:true
    },//开发服务器
    module:{
        rules:[
        { test: /\.css|\.styl$/, use: [ 'style-loader', 'css-loader','stylus-loader' ]  },
        // { test: /\.styl/, use: [ 'style-loader', 'css-loader', 'stylus-loader' ] },
    ]
    },//模块配置
    plugins:[
        new webpack.HotModuleReplacementPlugin({
            //热更新设置好，但还无法使用需要到js文件监听模块
         }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',//代码模板页位置
            title:"我的第一个demo代码模板片段",
            // 默认js链接index 因为出口只有一个
        }),
        new CleanWebpackPlugin(['./build']),//打包清空
    ],//插件的配置
    mode:'development',// 可以更改模式   "development" | "production" | "none"
    resolve:{},//配置解析
    
}

