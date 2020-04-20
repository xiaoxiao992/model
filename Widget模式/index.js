// widget模式（可以在任意页面中执行的代码块）：借用web widget思想将页面分解成部件，针对部件开发，最终组合成完整的页面
// 实现原理： 分四步：第一步处理数据，第二步获取模版，第三步处理模版，第四步遍历执行
// 模版引擎模块
F.module('lib/template', function(){
    // 模版引擎 处理数据与编译模块入口
    var _TplEngine = function() {},
        // 获取模版
        _getTpl = function() {},
        // 处理模版
        _dealTpl = function() {},
        // 编译执行
        _compileTpl = function() {};
    return _TplEngine;
})

// 引用模版引擎模块依赖
F.module(['lib/template'], function(template) {
    // do something
})

// 处理数据
/***
 * 模版引擎 处理数据与编译模版入口
 * @param str 模版容器 id或者模版字符串
 * @param data 渲染数据
 */
_TplEngine = function(str, data) {
    // 如果数据是数组
    if(data instanceof Array) {
        // 缓存渲染模版结果
        var html = '',
            // 数据索引
            i = 0,
            // 数据长度
            len = data.length;
        // 遍历数据
        for(; i < len; i++) {
            // 缓存模版渲染结果
            html +=_getTpl(str)(data[i]);
        }
        // 返回模版渲染最终结果
        return html;
    } else {
        // 返回模版渲染结果
        return _getTpl(str)(data);
    }

}
// 获取模版
/**
 * @param str 模版容器id 或者模版字符串
 */
_getTpl = function(str) {
    // 获取元素
    var ele = document.getElementById(str);
    // 如果 元素存在
    if(ele) {
        //  如果是input或者textarea表单元素，则获取该元素的value值，否则获取元素的内容
        var html = /^(textarea | input)$/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
        // 编译模块
        return _compileTpl(html);
    } else {
        // 编译模版
        return _compileTpl(str);
    }
}

/**
 * 处理模版
 */
_dealTpl = function(str) {
    var _left = '{%', // 左分隔符
        _right = '%}'; // 右分隔符
       //  显示转化为字符串
    return String(str)
            // 转义标签内的< 如： <div>{%if(a&lt; b)%}</div> -> <div>{%if(a < b)%}</div>
            .replace(/&lt;/g, '<')
            // 转义标签内的>
            .replace(/&gt;/g, '>')
            // 过滤回车符，制表符，回车符
            .replace(/[\r\t\n]/g, '')
            // 替换内容
            .replace(new RegExp(_left+'=(.*?)'+_right, 'g'), "',typeof($1) === 'undefined' ? '' : $1, '")
            // 替换左分隔符
            .replace(new RegExp(_left, 'g'), "');")
            // 替换右分隔符
            .replace(new RegExp(_right, 'g'), "template_array.push('");")
}
// 编译执行
/**
 * 编译执行
 * @param str 模版数据
 */
_compileTpl = function(str) {
    // 编译函数体
    var fnBody = "var template_array = [];\nvar fn = (function(data) {\nvar template_key = '';\nfor(key in data) {\ntemplate_key+=('var '+key+'=data[\"'+key+'\"];');\n}\neval (template_key);\ntemplate_array.push('"+_dealTpl(str)+"');\ntemplate_key=null;\n})(templateData);\nfn = null;\nreturn template_array.join('');";
    // 编译函数
    return new Function('templateData', fnBody);
}
// "// 声明template_array 模版容器组
// var template_array = [];\n
// // 闭包，模版容器组添加成员
// var fn = (function(data) {\n
//     // 渲染数据变量的执行函数体
//     var template_key = ''; \n
//     // 遍历渲染数据
//     for(key in data) { \n
//         // 为渲染数据变量的执行函数体添加赋值语句
//         template_key +=('var '+key+'=data[\"'+key+'"\];');\n
//     }\n
//     // 执行渲染数据变量函数
//     eval(template_key); \n
//     // 为模版容器组添加成员（注意，此时渲染数据将替换容器中的变量）
//     template_array.push('"+_dealTpl(str)+"');\n
//     // 释放渲染数据变量函数
//     template_key = null; \n
//     // 为闭包传入数据
// })(templateDate);\n
// // 释放闭包
// fn = null; \n
// // 返回渲染后的模版容器组，并拼接成字符串
// return template_array.join('');"

// 页面元素内容
