// 寄生式继承 ----寄生式继承就是对原型继承的第二次封装，并且在第二次封装过程中对继承的对象进行了拓展
// 声明基对象
var book = {
    name: 'js book',
    alikeBook: ['css book', 'html book']
}
/**
 * 原型是继承
 * @param {*} o 
 */

function inheritObject(o) {
    function F() {
 
    }
    // 过渡对象的原型继承父对象
    F.prototype = 0
    return new F()   
 }

function createBook(obj) {
    // 通过原型继承方式创建新对象
    var o = new inheritObject(obj)
    // 拓展新对象

    o.getName = function() {
        console.log(name)
    }
    // 返回拓展后的新对象
    return o
}