// 解释器模式
// 同级兄弟元素遍历
// 获取兄弟元素名称
function getSublingName(node) {
    // 如果存在兄弟元素
    if(node.previousSibling) {
        var name = '', // 返回的兄弟元素名称字符串
            count = 1, // 紧邻兄弟元素中相同名称元素个数
            nodeName = node.nodeName, //原始节点名称
            sibling = node.previousSibling; // 前一个兄弟元素
        // 如果存在前一个兄弟元素
        while(sibling) {
            // 如果节点为元素，并且节点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名称存在
            if(sibling.nodeType === 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
                // 如果节点名称和前一个兄弟元素名称相同
                if(nodeName === sibling.nodeName) {
                    // 节点名称后面添加计数
                    name += ++count;
                } else {
                    // 重置相同紧邻节点名称节点个数
                    count = 1;
                    // 追加新的节点名称
                    name += '|' + sibling.nodeName.toUpperCase();
                }
                // 向前获取前一个兄弟元素
                sibling = sibling.previousSibling;
            }
            return name;
            // 否则不存在兄弟元素返回
        }
    } else {
        return '';
    }
}

// 遍历文档树
// XPath解释器
var Interpreter = (function() {
   // 获取兄弟元素名称
   function getSublingName(node) {
     return ''
   }  
   // 参数1 node: 目标节点  参数2 wrap： 容器节点
   return function(node, wrap) {
        //  路径数组
        var path = [],
            // 如果不存在容器节点，默认为document
            wrap = wrap || document;
        // 如果当前（目标）节点等于容器节点
        if(node === wrap) {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                // 路径数组中输入容器节点名称
                path.push(wrap.nodeName.toUpperCase());
            }
            // 返回最终路径数组结束
            return path;
        }
        // 如果当前节点的父节点不等于容器节点
        if(node.parentNode !== wrap) {
            // 对当前节点的父节点执行遍历操作
            path = arguments.callee(node.parentNode, wrap);
        }
        // 如果当前节点的父元素节点与容器节点相等
        else {
            // 容器节点为元素
            if(wrap.nodeType === 1) {
                // 路径数组中输入容器节点名称
                path.push(wrap.nodeName.toUpperCase());
            }
        }
        // 获取元素的兄弟元素名称统计
        var sublingsNames = getSublingName(node);
        // 如果节点为元素
        if(node.nodeType === 1) {
            // 输入当前节点元素名称及其前面兄弟元素名称统计
            path.push(node.nodeName.toUpperCase() + sublingsNames);
        }
        // 返回最终路径数组结果
        return path;
   }
// 立即执行方法
})();

// 解释器即是对客户提出的需求，经过解析而形成的一个抽象解释程序。而是否可以应用解释器模式的一条重要准则是能否根据需求解析出一套完成的语法规则，不论该语法规则简单或是复杂都是必须的