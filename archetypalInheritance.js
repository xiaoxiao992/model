// 原型式继承 ----类式继承的一个封装
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

var book = {
    name: 'js book',
    alikeBook: ['css book', 'html book']
}
var newBook = inheritObject(book)
newBook.name = 'ajax book'
newBook.alikeBook.push('xml book')

var otherBook = inheritObject(book)
otherBook.name = 'flash book'
otherBook.alikeBook.push('as book')

console.log(newBook.name)
console.log(newBook.alikeBook)

console.log(otherBook.name)
console.log(otherBook.alikeBook)

console.log(book.name)
console.log(book.alikeBook)