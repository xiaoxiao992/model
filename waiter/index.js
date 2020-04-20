// 等待这模式
// 等待对象
var Waiter = function() {
    // 注册了的等待对象容器
    var dfd = [],
        // 成功回调方法容器
        doneArr = [],
        // 失败回调方法容器
        failArr = [],
        // 缓存Array方法slice
        slice = Array.prototype.slice,
        // 保存当前等待者对象
        that = this;
    // 监控对象类
    var Primise = function() {
        // 监控对象是否解决成功状态
        this.resolved = false;
        // 监测对象是否解决失败状态
        this.rejected = false;
    }
    // 监控对象类原型方法
    Primise.prototype = {
        // 解决方法
        resolve: function() {
            // 设置当前监控对象解决成功
            this.resolved = true;
            // 如果没有监控对象则取消执行
            if(!dfd.length)
               return;
            // 遍历所有注册了的监控对象
            for(var i = dfd.length - 1; i >= 0; i--) {
                // 如果有任意一个监控对象没有被解决或者解决失败则返回
                if(dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
                    return;
                }
                // 清除监控对象
                dfd.splice(i, 1);
            }
            // 执行解决成功回调方法
            _exec(doneArr);
        },
        reject: function() {
            // 设置当前监控对象解决失败
            this.rejected = true;
            // 如果没有监控对象则取消执行
            if(!dfd.length) 
              return;
            // 解决所有监控对象
            dfd.splice(0);
            // 执行解决成功回调方法
            _exec(failArr);
        }
    }
    // 创建监控对象
    that.Deferred = function(){
        return new Primise();
    }
    // 回调执行方法
    function _exec(arr) {
        var i = 0,
            len = arr.length;
        // 遍历回调数组执行回调
        for(; i < len; i++) {
            try {
              // 执行回调函数
              arr[i] && arr[i]();  
            } catch(e) {

            }
        }
    }
    // 监控异步方法 参数：监测对象
    that.when = function() {
        // 设置监控对象
        dfd = slice.call(arguments);
        // 获取监控对象数组长度
        var i = dfd.length;
        // 向前遍历监控对象，最后一个监控对象的索引值为length -1
        for(--i; i >= 0; i++) {
            // 如果不存在监控对象，或者监控对象已经解决，或者不是监控对象
            if(!dfd[i] || dfd[i].resolved || dfd[i].rejected | !dfd[i] instanceof Primise) {
                // 清理内存 清除当前监控对象
                dfd.splice(i, 1);
            }
        }
        // 返回等待着对象
        return that;
    };
    // 解决成功回调函数添加方法
    that.done = function() {
        // 向成功回调函数容器中添加回调方法
        doneArr = doneArr.concat(slice.call(arguments));
        // 返回等待者对象
        return that;
    };
    // 解决失败回调函数添加方法
    that.fail = function() {
        // 向失败回调函数容器中添加回调方法
        failArr = failArr.concat(slice.call(arguments));
        // 返回等待着对象
        return that;
    }
}


// 异步方法
setTimeout(function() {
    console.log('first');
}, 30)
console.log('second');


// 结果如何
// 创建一个等待者对象
var waiter = new Waiter();
// 第一个彩蛋，5秒后停止
var first = function() {
    // 创建监听对象
    var dtd = waiter.Deferred();
    setTimeout(function() {
        console.log('first finish');
        // 发布解决成功消息
        dtd.resolve();
    }, 5000);
    // 返回监听对象
    return dtd;
}();
// 第二个彩蛋，10秒后停止
var second = function() {
    // 创建监听对象
    var dtd = waiter.Deferred();
    setTimeout(function() {
        console.log('second finish');
        // 发布解决成功消息
        dtd.resolve();
    }, 10000);
    return dtd;
}

waiter.
    when(first, second)
    .done(function() {
        console.log('success');
    }, function() {
        console.log('success again')
    })
    // 添加失败回调函数
    .fail(function() {
        console.log('fail')
    });

var first = function() {
    var dtd = waiter.Deferred();
    setTimeout(function() {
        console.log('first finish');
        // 发布解决失败消息
        dtd.reject();
    }, 5000)
    return dtd;
}();




