// 策略模式： 将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定独立性，不会岁客户端变化而变化
// 策略对象
// 价格策略对象
var PriceStrategy = function() {
    // 内容算法对象
    var stragtegy = {
        // 100返30
        return30: function(price) {
            // parseInt可通过～～、|等运算符替换，要注意此时price要在【-2147483648, 2147483648】
            // +price转化为数字类型
            return +price + parseInt(price / 100) * 30;
        },
        // 100返50
        return50: function(price) {
            return +price + parseInt(price / 100) * 50;
        },
        // 9折
        percent90: function(price) {
            // Javascript在处理小数乘除法有bug，故运算前转化为整数
            return price * 100 * 90 / 10000;
        },
        // 8折
        percent80: function(price) {
            // Javascript在处理小数乘除法有bug，故运算前转化为整数
            return price * 100 * 80 / 10000;
        },
        // 5折
        percent80: function(price) {
            // Javascript在处理小数乘除法有bug，故运算前转化为整数
            return price * 100 * 50 / 10000;
        }
    }
    // 策略算法调用接口
    return function(algorithm, price) {
        // 如果算法存在，则调用算法，否则返回false
        return stragtegy[algorithm] && stragtegy[algorithm](price)
    }
}();

var price1 = PriceStrategy('return50', '314.67')
console.log(price1)
