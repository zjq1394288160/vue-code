class ParentOne {
    constructor (name) {
        this.name = name;
        this.age = '260'
    }
    getEat () {
        return this.name + '正在吃饭----'
    }
}
var child = new ParentOne('张三');
console.log(child.getEat());

var myTest = ()=>{
    console.log('hello babel');
}
myTest();

let arr = [()=>{return '你好'}, ()=>{return '我好'} , ()=>{return '大家好'}];
arr.forEach((item)=>{
    console.log(item)
})

