// 单继承 属性复制
// extend方法是一个浅复制过程，他只能复制值类型的属性
var extend = function(target, source) {
    for(var property in source) {
        // 将源对象中的属性复制到目标对象中
        target[property] = source[property]
    }
    // 返回目标对象
    return target
}

var book = {
    name: 'Javascript',
    alike: ['css', 'html', 'Javascript']
}
var anotherBook = {
    color: 'blue'
}
extend(anotherBook, book)
console.log(anotherBook.name)
console.log(anotherBook.alike)

anotherBook.alike.push('ajax')
anotherBook.name = '设计模式'
console.log(anotherBook.name)
console.log(anotherBook.alike)
console.log(book.name)
console.log(book.alike)