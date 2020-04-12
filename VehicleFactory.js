// 抽象工厂其实是一个实现子类继承父类的方法，在这个方法中我们需要通过传递子类以及要继承父类(抽象类）的名称
// 抽象工厂模式
var VehicleFactory = function(subType, superype) {
    // 判断抽象工厂中是否有该抽象类
    if(typeof VehicleFactory[superype] === 'function') {
        // 缓存类
        function F() {}
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superype]()
        // 将子类constructor指向子类
        subType.constructor = subType
        // 子类原型继承'父类'
        subType.prototype = new F()
    } else {
        // 不存在该抽象类抛出错误
        throw new Error('未创建该抽象类')
    }
}

// 小汽车抽象类
VehicleFactory.Car = function() {
    this.type = 'car'
}
VehicleFactory.Car.prototype = {
    getPrice: function() {
        return new  Error('抽象方法不能调用')
    },
    getSpeed: function() {
        return new  Error('抽象方法不能调用')
    }
}
// 公交车抽象类
VehicleFactory.Bus = function() {
    this.type = 'bus'
}
VehicleFactory.Bus.prototype = {
    getPrice: function() {
        return new  Error('抽象方法不能调用')
    },
    getPassengerNum: function() {
        return new  Error('抽象方法不能调用')
    }
}
// 货车抽象类
VehicleFactory.Truck = function() {
    this.type = 'truck'
}
VehicleFactory.Truck.prototype = {
    getPrice: function() {
        return new  Error('抽象方法不能调用')
    },
    getTrainload: function() {
        return new  Error('抽象方法不能调用')
    }
}

// 使用方式
// 宝马汽车子类
var BMW = function(price, speed) {
    this.price = price
    this.speed = speed
}
// 抽象工厂实现对car抽象类的继承
VehicleFactory(BMW, 'Car')
BMW.prototype.getPrice = function() {
    return this.price
}
BMW.prototype.getSpeed = function() {
    return this.speed
}
// 兰博基尼汽车子类
var Lamborghini = function(price, speed) {
    this.price = price
    this.speed = speed
}
// 抽象工厂实现对car抽象类的继承
VehicleFactory(Lamborghini, 'Car')
Lamborghini.prototype.getPrice = function() {
    return this.price
}
Lamborghini.prototype.getSpeed = function() {
    return this.speed
}
// 宇通汽车子类
var YUTONG = function(price, passenger) {
    this.price = price
    this.passenger = passenger
}
// 抽象工厂实现对bus抽象类的继承
VehicleFactory(YUTONG, 'Bus')
YUTONG.prototype.getPrice = function() {
    return this.price
}
YUTONG.prototype.getPassengerNum = function() {
    return this.passenger
}
// 奔驰汽车子类
var BenzTruck = function(price, trainLoad) {
    this.price = price
    this.trainLoad = trainLoad
}
VehicleFactory(BenzTruck, 'Truck')
BenzTruck.prototype.getPrice = function() {
    return this.price
}
BenzTruck.prototype.getTrainload = function() {
    return this.trainLoad
}

var truck = new BenzTruck(10000, 100)
console.log(truck.getPrice())
console.log(truck.type)
