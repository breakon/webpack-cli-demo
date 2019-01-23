# 这是一个记录我如何一步一步搭建webpack4 基本操作


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
        port:10086,
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
##热更新
```js

let webpack= require('webpack');//热更新
module.exports={
  ...
  devServer:{
      ...
      hot:true
      ...
  },
  ...
  plugins:[
        new webpack.HotModuleReplacementPlugin({
            //热更新设置好，但还无法使用需要到js文件监听模块
         }),]
}
```

index.js 是控制html css js 的一个模块,可以通过`require` 关联
```js
// index.js模块
let str = require('./link.js');
document.querySelector('#hotUp').innerText=str;
if(module.hot){
    module.hot.accept();
}
```
```html
<div id="hotUp" >我是一个热更新样例</div>
```

创建
>fs.writeFile('./src/link.js',"",(err) => {})
```js
// link.js引入到index模块
module.exports="热更新完成hhh..."
```

### 11.使用css
webpack 只能识别js ，css模块不能识别
`stylus` 是 CSS 的预处理框架,可以编程的css 
>npm install   style-loader  css-loader less less-loader stylus stylus-loader

需要loader加载器 ,配置webpack.config
```js

 module:{
        rules:[
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]  }, 
        ]
    },//模块配置
```
创建style.css
>fs.writeFile('./src/style.css',"",(err) => {})
```css
body{ padding: 0; margin: 0;}
```
添加内容到`index.js`
```js
// index.js
 import './style.css'; //引入 
```
#### 成功引入后 运行测试 
>npm run start

### 11.5 使用stylus

创建gStyls.styl
>fs.writeFile('./src/gStyls.styl',"",(err) => {})
```css
body
  background:#efefef
```
引入
```js
// index.js
import './gStyls.styl';
```
修改webpack.config.js
```js
module:{
    rules:[
        { test: /\.css|\.styl$/, use: [ 'style-loader', 'css-loader','stylus-loader' ]}, //修改的
    ], 
    },//模块配置
```

### 12跳转页面以及多页配置 (让link.js 和 newlink.html ,index.js 和index.html)

新建一个为 newlink.html
>fs.writeFile('./src/newlink.html',"",(err) => {}) 

newLink 添加
```html
<p>newLink</p>
```

修改 `webpack.config.js`
```js
module.exports={

 // entry:['./src/index.js','./src/a.js'],//人口 -数组单页配置法  根据数组完成多个js配置index.html文件
    entry:{
        // 多页配置法 -但这样出口文件不能只有一个需要修改
        index:'./src/index.js',
        mylink:'./src/newlink.js', //键值key 为文件名，值为源文件名字包含路径
    },

    plugins:[ 
        ...
     new HtmlWebpackPlugin({
            filename:'link.html',
            template:'./src/newlink.html',
            hash: true,
            chunks:['mylink']
            //单独为引入link,并且注意`入口`文件名字已经被重新定义为mylink，
            // 引入src 的link文件中的js，并且打包后filename把文件改成了link.html
        }), 
        ...
    ]
}
```

* index.html 添加
```html 
<!-- link.html 文件以及被HtmlWebpackPlugin  的filename 改成 link 了所以链接应该是 -->
<a href="link.html">newlink</a>
```

# webpack基本操作 end 




