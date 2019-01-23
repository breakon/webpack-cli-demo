console.log('这是主页')
import './style.css'; //引入 
import './gStyls.styl'; //引入 

let str = require('./link.js');
document.querySelector('#hotUp').innerText=str;
if(module.hot){
    module.hot.accept();
}