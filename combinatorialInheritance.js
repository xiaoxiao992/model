// 组合继承
/**
 * 声明父类
 * @param {*} name 
 */
function SuperClass(name) {
    // 值类型共有属性
    this.name = name
    // 引用类型共有属性
    this.books = ['html', 'css', 'JavaScript']
}
// 父类原型共有方法
SuperClass.prototype.getName = function() {
    console.log(this.name)
}
// 声明子类
function SubClass(name, time) {
    // 构造函数式继承父类name属性
    SuperClass.call(this, name)
    // 子类中新增共有属性
    this.time = time
}
// 类式继承，子类原型继承父类
SubClass.prototype = new SuperClass()
// 子类原型方法
SubClass.prototype.getTime = function() {
    console.log(this.time)
}

// 例子
var instance1 = new SubClass('js book', 2014)
instance1.books.push('设计模式')
console.log(instance1.books)
instance1.getName()
instance1.getTime()

var instance2 = new SubClass('css book', 2013)
console.log(instance2.books)
instance2.getName()
instance2.getTime()