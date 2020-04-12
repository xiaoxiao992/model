// 状态模式（state)：当一个对象的内部状态发生变化时，会导致其行为的变化，这看起来像是改变了对象
// 展示结果
function showResult(result) {
    if(result === 0) {
        // 处理结果0
    } else if(result === 1) {
        // 处理结果1
    } else if(result ===2) {
        // 处理结果2
    } else if(result === 3) {
        // 处理结果3
    }
}

// 投票结果状态对象
var ResultState = function() {
    // 判断结果保存在内部状态中
    var States = {
        // 每种状态作为一种独立方法保存
        state0: function() {
            // 处理结果0
            console.log('这是第一种情况');
        },
        state1: function() {
            // 处理结果1
            console.log('这是第二种情况');
        },
        state2: function() {
            // 处理结果2
            console.log('这是第三种情况');
        },
        state3: function() {
            // 处理结果3
            console.log('这是第四种情况');
        }
    }
    // 获取某一周状态并执行其对应的方法
    function show(result) {
        States['state' + result] && States['state'+ result]();
    }
    return {
        // 返回调用状态方法接口
        show: show
    }
}();

// 单动作条件判断 每增加一个动作就需要添加一个判断
var lastActions = '';
function changeMerry(action) {
    if(action === 'jump') {
        // 跳跃动作
    } else if(action === 'move') {
        // 移动动作
    } else {
        // 默认情况
    }
    lastActions = action;
}

// 复合动作对条件判断的开销是翻倍的
var lastAction1 = '';
var lastAction2 = '';
function changeMerry(action1, action2) {
    if(action1 === 'shoot') {
        // 射击
    } else if(action1 === 'jump') {
        // 跳跃
    } else if(action1 === 'move' && action2 === 'shoot') {
        // 移动中射击
    } else if(action1 === 'jump' && action2 === 'shoot') {
        // 跳跃中射击
    }
    // 保留上一个动作
    lastAction1 = action1 || '';
    lastAction2 = action2 || '';
}

// 创建超级玛丽状态类
var MarryState = function() {
    // 内部状态私有变量
    var _currentsState = {},
        // 动作与状态方法映射
        states = {
            jump: function() {
                // 跳跃
                console.log('jump');
            },
            move: function() {
                // 移动
                console.log('move');
            },
            shoot: function() {
                // 射击
                console.log('shoot');
            },
            squat: function() {
                // 蹲下
                console.log('squat');
            }
        };
    // 动作控制类
    var Actions = {
        // 改变状态方法
        changeState: function() {
            // 组合动作通过传递多个参数实现
            var arg = arguments;
            // 重置内部状态
            _currentsState = {};
            // 如果有动作则添加动作
            if(arg.length) {
                // 遍历动作
                for(var i = 0, len = arg.length; i < len; i++) {
                    // 向内部状态中添加动作
                    _currentsState[arg[i]] = true;
                }
            }
            // 返回动作控制类
            return this;
        },
        // 执行动作
        goes: function() {
            console.log('触发一次动作');
            // 遍历内容状态保存的动作   
            for(var i in _currentsState) {
                states[i] && states[i]();
            }
            return this;
        }
    }
    // 返回接口方法change、goes
    return {
        change: Actions.changeState,
        goes: Actions.goes
    }
}

// MarryState()
//     .change('jump', 'shoot') // 添加跳跃与设计动作
//     .goes()                  //  执行动作
//     .goes()                  //  执行动作
//     .change('shoot')         // 添加射击动作
//     .goes();                 // 执行动作

var marry = new MarryState();
marry
    .change('jump', 'shoot') // 添加跳跃与设计动作
    .goes()                  //  执行动作
    .goes()                  //  执行动作
    .change('shoot')         // 添加射击动作
    .goes();  