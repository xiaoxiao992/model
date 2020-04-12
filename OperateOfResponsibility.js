// 链模式： 通过在对象方法中将当前对象返回，实现对同一个对象多个方法的链式调用。
// 从而简化对该对象的多个方法的多次调用是，对该对象的多次引用
// 原型式继承
var A = function() {}
A.prototype = {
   length: 2,
   size: function() {
       return this.length;
   }
}

var a = new A();
console.log(a.size());

// 找位