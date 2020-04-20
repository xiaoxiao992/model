// 参与者模式：在特定的作用域中执行给定的函数，并将参数原封不动地传递。
// 事件绑定方法 ---兼容各个浏览器，但是不能实现传递额外的数据需求
// A.event.on = function(dom, type, fn, data) {
//     // w3c标准事件绑定
//     if(dom.addEventListener) {
//         dom.addEventListener(type, function(e) {
//             // call 与apply可以使我们在特定作用域中执行某个函数，并传入参数
//             fn.call(dom, e, data);
//         }, false);
//     } else if(dom.addtachEvent) {
//         // ie事件绑定
//         dom.addtachEvent('on' + type, fn);
//        //  DOMO级事件绑定 
//     } else {
//         dom['on' + type] = fn;
//     }
// }

// 函数绑定
function bind(fn, context) {
   // 闭包返回新函数
   return function() {
        // 对fn装饰并返回
        return fn.apply(context, arguments);
   }    
}

// 测试一下
// 测试对象
var demoObj = {
    title: '这是一个例子'
}
// 测试方法
function demoFn() {
    console.log(this.title);
}
// 让demoObj参与demoFn的执行
var bindFn = bind(demoFn, demoObj);
demoFn();  // 输出----undefined
bindFn();  // 输出----这是一个例子
// 应用于事件--- 这部分移到html里面
// var btn = document.getElementsByTagName('button')[0];
// var p =document.getElementsByTagName('p')[0];
// // 对demoFn改进，在控制台输出参数与this对象
// function demoFn() {
//     console.log(arguments, this);
// }
// // 未设置提供参与对象
// var bindFn = bind(demoFn);
// // 绑定事件
// btn.addEventListener('click', bindFn);
// // 输出-----
// // 提供btn元素参与对象
// var binFn = bind(demoFn, btn);
// // 输出---
// // 提供p元素参与对象
// var bindFn = bind(demoFn, p);
// //输出---
// // 移除事件
// btn.removeEventListener('click', binFn);


// 函数柯里化----对函数的参数分割，有点像类的多态
// 根据传递的参数不同，可以让一个函数存在多种状态
// 函数柯里化
function curry(fn) {
    // 缓存数组slice方法Array.prototype.slice
    var Slice = [].slice
    console.log('------slice',Slice.call(arguments, 1))
    // 从第二个参数开始截取参数
    var args = Slice.call(arguments, 1);
    // 闭包返回新函数
    return function() {
        // 将参数（类数组）转化为数组
        console.log('-----', Slice.call(arguments))
        var addArgs = Slice.call(arguments),
            // 拼接参数
            allArgs = args.concat(addArgs);
        // 返回新参数
        // apply 参数：数组
        return fn.apply(null, allArgs);
    }
}
// 测试柯里化
// 创建一个加法器，然后对加法器进行拓展
function add(num1, num2){
    return num1 + num2;
}
// 加5加法器
// function add5(num) {
//     return add(5, num);
// }
// 测试add加法器
console.log(add(1, 2));
// 测试add5加法器
// console.log(add5(6));
// 函数柯里化创建加5加法器
var add5 = curry(add, 5);
console.log(add5(7));
var add7add8 = curry(add, 7, 8);
console.log(add7add8());


// 重构bind
function bind(fn, context) {
    // 缓存数组slice方法
    var Slice = Array.prototype.slice,
        // 从第三个参数开始截取参数（包括第三个参数）
        args = Slice.call(arguments, 2);
    // 返回新方法
    return function() {
         // 将参数转化为数组
         var addArgs = Slice.call(arguments),
            //   拼接参数
            allArgs = addArgs.concat(args);
        // 对fn装饰并返回
        return fn.apply(context, allArgs);
    }    
 }

 // 现在我们创建两个数据对象demoData1 和demoData2然后传入事件的回调函数中
 var demoData1 = {
     text: '这是第一组数据'
    },
    demoData2 = {
        text: '这是第二组数据'
    };
// 提供btn元素、demoData1参与对象
// var bindFn = bind(demoFn, btn, demoData1);
// chrome输出： 
// 提供btn元素、demoData1、demoData2参与对象
// var bindFn = bind(demoFn, btn, demoData1, demoData2);
// chrome输出： 
// 提供p元素、demoData1参与对象
// var bindFn = bind(demoFn, p, demoData1);
// chrome输出： 


// 兼容版本
// 兼容各个浏览器
if(Function.prototype.bind === undefined) {
    Function.prototype.bind = function(context) {
        // 缓存数组slice方法
        var Slice = Array.prototype.slice,
            // 从第二个参数截取参数
            args = Slice.call(arguments, 1),
            // 保存当前函数引用
            that = this;
        return function() {
            // 将参数数组化
            var addArgs = Slice.call(arguments),
               // 拼接参数，注意：传入的参数放到了后面
               allArgs = args.concat(addArgs);
            // 对当前函数装饰并返回
            return that.apply(context, allArgs);
        }
    }
}


// 反柯里化
Function.prototype.uncurry = function() {
    // 保存当前对象
    var that = this;
    return function() {
        return Function.prototype.call.apply(that, arguments);
    }
}

// 当用
// Object.prototype.toString校验对象类型时
// 获取校验方法
var toString = Object.prototype.toString.uncurry();
// 测试对象数据类型
console.log(toString(function() {}));
console.log(toString([]));

// 用数组的push方法为对象添加数据成员
var push = [].push.uncurry();
// 创建一个对象
var demoArr = {};
// 通过push方法为对象添加数据成员
push(demoArr, '第一个成员', '第二个成员');
console.log(demoArr);
 
 
