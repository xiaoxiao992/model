// 子类的原型对象-----类式继承
// 声明父类
function SuperClass() {
    this.supervalue = true
}
// 为父类添加共有方法
SuperClass.prototype.getSuperValue = function() {
    return this.supervalue
}
// 声明子类
function SubClass() {
    this.subValue = false
}

// 继承父类
SubClass.prototype = new SuperClass()
// 为子类添加共有方法
SubClass.prototype.getSubValue = function() {
    return this.subValue
}

var instance = new SubClass()
console.log(instance.getSuperValue())
console.log(instance.getSubValue())

// 弊端
function SuperClass() {
    this.books = ['Javascript', 'html', 'css']
}
function SubClass() {}
SubClass.prototype = new SuperClass()
var instance1 = new SubClass()
var instance2 = new SubClass()
console.log(instance2.books)
instance1.books.push('设计模式')
console.log(instance2.books)
