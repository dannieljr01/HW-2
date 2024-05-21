var obj2={
    name: 'obj2',
    func: obj1.func
};
var callback2=onj.func();
setTimeout(callback2,1500);

var obj3={name:'obj3'};
var callback3=obj1.func.call(obj3);
setTimeout(callback3,2000);