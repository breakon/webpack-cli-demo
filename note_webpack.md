### 1.初始化 webpack-cli-demo 文件夹并且 在文件夹内输入

创建一个更目录 `package.json`
> npm init -y


### 2.局部安装

> npm install webpack webpack-cli -D

### 3.新建 src 文件

首先新建一个 webpack-cli-demo/src 文件夹 里面存放开发项目文件`输入node 执行以下命令`
> fs.mkdir('./src',(err)=>{}) 

### 4.webpack4 可以不需要配置就可以运行，但还是不够灵活，所以创建webpack-cli-demo/webpack.config.js
 
> fs.writeFile('./webpack.config.js',"",(err) => {})

> fs.writeFile('./src/index.js',"",(err) => {}) 
`webpack.config.js`配置基本内容如下
```js
let path = require('path');
module.exports={
    entry:'./src/index.js', //人口
    output:{
        // 出口
        filename:'build.js',//重新取名字
        path:path.resolve('./build')//必须是一个绝对路径
    },
    devServer:{
        contentBase:'./build',
        port:6666,
        compress:true,// 服务器压缩
        open:true,
        // hot:true
    },//开发服务器
    module:{},//模块配置
    plugins:[],//插件的配置
    mode:'development',// 可以更改模式   "development" | "production" | "none"
    resolve:{},//配置解析
}
```

### 5.服务器配置 安装热更新
>npm install webpack-dev-server -D

### 6.安装依赖插件
`html模板片段`
>npm install html-webpack-plugin

```js
let HtmlWebpackPlugin = require('html-webpack-plugin');//代码片段打包,添加这条到webpack.config.js开头
module.exports={
    ...
}
```
* 在里面配置 webpack.config.js 文件 添加到 plugins:[] 
```js
  new HtmlWebpackPlugin({
            template:'./src/index.html',//代码模板页位置
            title:"我的第一个demo代码模板片段",
        }),
```
* html文件夹中 index.html
>fs.writeFile('./src/index.html',"",(err) => {}) 
```html
<html>
    <head>
        <title> <%=htmlWebpackPlugin.options.title%> </title>
    </head>
    <body></body>
</html>
```

### 7.在package.json  修改scripts 内容为
```json
"scripts": {
    "build": "webpack", //建立真实的文件 最终打包项目上线， 上线模式
    "start":"webpack-dev-server", //启动webpack, 在线预览 开发模式
    "test": "echo \"Error: no test specified\" && exit 1" //默认初始化的命令
  },
```

* 常用的两个命令

`在线运行及时更新的页面`
>npm run start

`打包文件`
>npm run build

### 8.清除每次打包多余的文件
>npm install clean-webpack-plugin -D 

```js
let CleanWebpackPlugin = require('clean-webpack-plugin'); //引用在webpack.config 行开头

//插件使用当前的插件
plugins:[
new CleanWebpackPlugin(['./build']),//打包清空
]
```
### 9.解决浏览器缓存打包预览缓存

`修改webpack.config 的 output`
```js 
output:{
        // 出口
        filename:'build.[hash:8].js',//重新取名字 -此方法是单页配置出口 
        path:path.resolve('./build')//必须是一个绝对路径
    },
```

### 9.5 打包文件测试是否正常(引用js)

`打包文件`
>npm run build

### 10 热更新配置
