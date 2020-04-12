// 建造者模式
// 建造者模式关注的是创建的细节

// 创建一位人类
 //创建一个人类
 var Human = function(param){
    //skill技能
    this.skill = param && param.skill || '保密';
    //兴趣爱好
    this.hobby = param && param.hobby || '保密';
}
//添加人类的原型方法
Human.prototype = {
    getSkill:function(){
        return this.skill;
    },
    getHobby:function(){
        return this.hobby;
    }
}
//创建姓名类
var Named = function(name){
    var that = this;
    //构造器函数：解析姓与名(new构造实例时即刻执行此闭包函数)
    (function(name,that){
      //闭包函数this指向window
        that.wholeName = name;//全名赋值
        if (name.indexOf(' ')>-1) {
            that.firstName = name.slice(0,name.indexOf(' '));
            that.secondName = name.slice(name.indexOf(' '));
        };
    })(name,that);
};
//创建职位类
var Work = function(work){
    var that = this;
    //构造器函数：通过传入的职位类设置相应的职位及描述
    (function(work,that){
        switch(work){
            case 'code':
                that.work = '软件工程师';
                that.workDescript = '每天都在敲代码';
            break;
            case 'UI':
            case 'UE':
                that.work = '设计师';
                that.workDescript = '设计是一种艺术';
            break;
            case 'teacher':
                that.work = '教师';
                that.workDescript = '分享也是一种快乐';
            break;
            default:
                that.work = work;
                that.workDescript = '没有合适的描述';
        }
    })(work,that);
}
//添加更换职位的方法
Work.prototype.changeWork = function(work){
    this.work = work;
}
//添加对职位的描述方法
Work.prototype.changeDescript = function(setence){
    this.workDescript = setence;
}
//创建一个应聘者builder
var Person = function(name,work,param){
    //实例化人对象 创建实例化缓存对象
    var _person = new Human(param);
    //实例化人的姓名
    _person.name = new Named(name);
    //实例化人的期望职位
    _person.work = new Work(work);
    //最后将构建的复杂对象应聘者返回出去
    return _person;
}
//测试用例
var person = new Person('小 明','code');

console.log(person.skill);  //保密
console.log(person.name.firstName);  //小
console.log(person.work.work); // 软件工程师
console.log(person.work.workDescript); //每天都在敲代码
person.work.changeDescript('我每天都在快乐的编程学习')
console.log(person.work.workDescript); //我每天都在快乐的编程学习  
console.log(person instanceof Person); //false
console.log(person instanceof Human); //true
console.log(person instanceof Named); //false
