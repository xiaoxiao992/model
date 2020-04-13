// 执行控制---节流模式
// 节流器
var throttle = function() {
    // 获取第一个参数
    var isClear = arguments[0], fn;
    // 如果第一个参数是boolean类型那么第一个参数则表示是否清除计时器
    if(typeof isClear === 'boolean') {
        // 第二个参数则为函数
        fn = arguments[1];
        // 函数的计时器句柄存在，则清除该计时器
        fn._throttleID &&clearTimeout(fn._throttleID);
        // 通过计时器延迟函数的执行
    } else {
        // 第一个参数为函数
        fn = isClear;
        // 第二个参数为函数执行时的函数
        param = arguments[1];
        // 对执行时的参数适配默认值，这里我们用到以前学习的extend方法
        var p = extend({
            context: null, // 执行函数执行时的作用域
            args: [],      // 执行函数执行时的相关函数
            time: 300      // 执行函数延迟执行的时间
        }, param);
        // 清除执行函数计时器句柄
        arguments.callee(true, fn);
        fn._throttleID = setTimeout(function() {
            //  执行函数
            fn.apply(p.context, p.args)  
        }, p.time)
    }
}

// 创建浮层类
// 外观模式封装获取元素方法
function $(id) {
    return document.getElementById(id);
}
function $tag(tag, container) {
    container = container || document;
    return container.getElementByTagName(tag)
}
// 浮层类
var Layer = function(id) {
    // 获取容器
    this.container = $(id);
    // 获取容器中的浮层容器
    this.layer = $tag('div', this.container)[0];
    // 获取icon容器
    this.lis = $tag('li', this.container);
    // 获取二维码图片
    this.imgs = $tag('img', this.container);
    // 绑定事件
    this.bindEvent();
}

Layer.prototype = {
    // 绑定交互事件
    bindEvent: function() {
        // 添加节流器
        //   缓存当前对象
        var that = this;
        // 隐藏浮层
        function hideLayer() {
            that.layer.className = '';
        }
        // 隐藏浮层
        function showLayer() {
            that.layer.className = 'show';
        }
        // 鼠标光标移入事件
        that.on(that.container, 'mouseenter', function() {
            // 清除隐藏浮层方法计时器
            throttle(true, hideLayer);
            // 延迟显示浮层方法
            throttle(showLayer);
            // 鼠标光标移出事件
        }).on(that.container, 'mouseleave', function() {
            // 延迟浮层隐藏方法
            throttle(hideLayer);
            // 清除显示浮层方法计时器
            throttle(true, showLayer);
        });
        // 遍历icon绑定事件
        for(var i = 0; i<that.lis.length; i++) {
            // 自定义属性index
            that.lis[i].index = i;
            // 为每一个li元素绑定鼠标移入事件
            that.on(that.lis[i], 'mouseenter', function() {
                // 获取自定义属性index
                var index = this.index;
                // 排除所有img的show类
                for(var i = 0; i < that.imgs.length; i++) {
                    that.imgs[i].className = ''
                }
                // 为目标图片设置show类
                that.imgs[index].className = 'show';
                // 从新定义浮层位置
                that.layer.style.left = -22 + 60 * index + 'px'
            })
        }
    },
    // 事件绑定方法
    on:function(ele, type, fn) {
       ele.addEventListener ? ele.addEventListener(type, fn, false) : ele.attachEvent('on'+ type, fn);
       return this;
    }
}

// 延迟加载图片类
/***
 * 节流延迟加载图片类
 * param id 延迟加载图片的容器id
 * 注： 图片格式如下<img src="img/loading.gif" alt="" data-src="img/1/jpg" />
 ***/
function LayerLoad(id) {
    // 获取需要节流延迟加载图片的容器
    this.container = document.getElementById(id);
    // 缓存图片
    this.imgs = this.getImgs();
    // 执行逻辑
    this.init();
}
LayerLoad.prototype = {
    // 起始执行逻辑
    init: function() {

    },
    // 获取延迟加载图片
    getImgs: function() {
        // 新数组容器
        var arr = [];
        // 获取图片
        var imgs = this.container.getElementsByTagName('img');
        // 将获取的图片转化为数组（IE下通过Array.prototype.slice会报错）
        for(var i = 0, len = imgs.length; i < len; i++) {
            arr.push(imgs[i])
        }
        return arr;
    },
    // 加载图片
    update: function() {
        // 如果图片都加载完成，返回
        if(!this.imgs.length) {
            return;
        }
        // 获取图片长度
        var i = this.imgs.length;
        // 遍历图片
        for(--i; i >=0; i--) {
            // 如果图片在可视范围内
            if(this.shouldShow(i)) {
                // 加载图片
                this.imgs[i].src = this.imgs[i].getAttribute('data-src');
                // 清除缓存重的此图片
                this.imgs.splice(i, 1);
            }
        }
    },
    // 判断图片是否在可视范围内
    pageY: function(element) {
        // 如果元素有父元素
        if(element.offsetParent) {
            // 返回元素+父元素高度
            return element.offsetTop + this.pageY(element.offsetParent);
        } else {
            // 否则返回元素高度
            return element.offsetTop;
        }
    },
    // 加载图片是否在可视范围内
    shouldShow: function() {
        // 获取当前图片
        var img = this.imgs[i],
            // 可视范围内顶部高度（页面滚动条top值）
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            // 可视范围内底部高度
            scrollBottom = scrollTop + document.documentElement.clientHeight;
            // 图片的顶部位置
            imgTop = this.pageY(img),
            // 图片的底部位置
            imgBottom = imgTop + img.offsetHeight;
            // 判断图片是否在可视范围内： 图片底部高度大于可视图顶部高度并且图片底部高度小于可视视图底部高度，或者图片顶部高度大于可视视图顶部高度并且图片顶部高度小于可视视图底部高度
            if(imgBottom > scrollTop && imgBottom < scrollBottom || (imgTop > scrollTop && imgTop < scrollBottom)) {
                return true;
            }
            // 不满足上面条件返回false
            return false;
    },
    // 绑定事件
    on: function(element, type, fn) {
        if(element.addEventListener) {
            addEventListener(type, fn, false);
        } else {
            element.attachEvent('on' + type, fn, false);
        }
    },
    // 为窗口绑定resize事件与scroll事件
    bindEvent:function() {
        var that = this;
        this.on(window, 'resiize', function() {
            //    节流处理更新图片逻辑
            throttle(that.update, { context: that });
        })
        this.on(window, 'scroll', function() {
            //    节流处理更新图片逻辑
            throttle(that.update, { context: that });
        })
    }
    
}

// 延迟加载container容器内的图片
new LayerLoad('container');


// 统计打包
// 打包统计对象
var LogPack = function() {
    var data = [],   // 请求缓存数组
        MaxNum = 10, // 请求缓存最大值
        itemSplitStr = '|', // 统计项统计参数间隔符
        keyValueSpliter = '*', // 统计项统计参数键值对间隔符
        img = new Image(); // 请求触发器，通过图片src属性实现简单的get请求
    // 发送请求方法
    function sendLOG() {
        // 请求参数
        var logStr = '',
           // 截取MaxNum个统计项发送
           fireData = data.splice(0, MaxNum);
        // 遍历统计项
        for(var i = 0, len = fireData.length; i < len; i++) {
            //    添加统计项顺序索引
            logStr += 'LOG' + i + '=';
            //  遍历统计项内的统计参数
            for(var j in fireData[i]) {
                // 添加统计项参数键 + 间隔符 + 值
                logStr += itemSplitStr;
            }
            // &添加统计项打包长度
            logStr += 'loglength=' + len;
            // 请求触发器发送统计
            img.src = 'a.gif?' + logStr;
        }
    }
    // 统计方法
    return function(param) {
        // 如果无参数则发送统计
        if(!param) {
            sendLOG();
            return;
        }
        // 添加统计项
        data.push(param);
        // 如果统计项大于请求缓存最大值则发送统计请求包
        data.length >= MaxNum && sendLOG();
    }
}

