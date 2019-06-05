let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');//代码片段打包
let CleanWebpackPlugin = require('clean-webpack-plugin'); 
let webpack= require('webpack');
module.exports={
     // entry:['./src/index.js','./src/a.js'],//人口 -数组单页配置法  根据数组完成多个js配置index.html文件
     entry:{
        // 多页配置法 -但这样出口文件不能只有一个需要修改
        './index/index':'./src/index.js', //路径可以是key
        './mylink/mylink':'./src/link.js', //键值key 为文件名，值为源文件名字包含路径
    },
    output:{
        // 出口
        // filename:'build.js',//重新取名字
        // filename:'build.[hash:8].js',
        filename: '[name].[hash:8].js', // 可以改成  js/[name].[hash: 8].js //-此方法是多页配置出口 但这样就必须修改模板页配置plugins>HtmlWebpackPlugin
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
    ]
    },//模块配置
    plugins:[
        new webpack.HotModuleReplacementPlugin({
            //热更新设置好，但还无法使用需要到js文件监听模块
         }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',//代码模板页位置
            title:"我的第一个demo代码模板片段",
            hash:true ,//清除缓存作用需要配合改文件名字数字哈希值
            chunks: ['./index/index'],//如果不写就会所有html页面都会引入同样的js文件，不做区分
        }),
        new HtmlWebpackPlugin({
            filename:'link.html',
            template:'./src/newlink.html',
            hash: true,
            chunks: ['./mylink/mylink']//单独为引入link,并且注意`入口`文件名字已经被重新定义为mylink，引入src 的abc文件中的js，并且打包后filename把文件改成了link.html
        }),
        new CleanWebpackPlugin(['./build']),//打包清空
    ],//插件的配置
    mode:'development',// 可以更改模式   "development" | "production" | "none"
    resolve:{},//配置解析
    
}

