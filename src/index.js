console.log('这是主页')
let str = require('./link.js');
document.querySelector('#hotUp').innerText=str;
if(module.hot){
    module.hot.accept();
}