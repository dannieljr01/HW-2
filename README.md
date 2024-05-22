# HW#2
## chap.4
### 예제4-1(콜백 함수 예제(1-1) setInterval)
```
var count=0;
var timer=setInterval(function(){
    console.log(count);
    if(++count>4) clearInterval(timer);
},300);
```
1번째 줄에서 count 변수를 선언하고 0을 할당, 2번째 줄에서는 timer 변수를 선언하고 여기에 setInterval을 실행한 결과를 할당.
### 예제4-2(콜백 함수 예제(1-2)setInterval)
```
var count =0;
var timer=setInterval(function(){
    console.log(count);
    if(++count>4) clearInterval(timer);
},300);

var cbFunc=function(){
    console.log(count);
    if(++count>4) clearInterval(timer);
};
var timer = setInterval(cbFunc,300);
```
예제4-1의 코드를 살짝 수정한 코드. timer 변수에 setInterval의 ID 값이 담김. 이 코드를 실행하면 콘솔창에는 0.3초에 한 번씩 숫자가 0부터 1씩 증가하며 출력되다가 4가 출력된 이후 종료. 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수 호출 시점에 대한 제어권을 가짐.
### 예제4-3(콜백 함수 예제(2-1)Array.prototype.map)
```
var newArr=[10,20,30] .map(function(currentValue,index){
    console.log(currentValue,index);
    return currentValue +5;
});
console.log(newArr);
```
배열 [10, 20, 30]의 각 요소를 처음부터 하나식 꺼내어 콜백 함수를 실행. 세 번째에 대한 콜백 함수까지 실행을 마치고 나면, [15, 25, 35]라는 새로운 배열이 만들어져서 변수 newArr에 담기고, 이 값이 5번째 줄에서 출력됨.
### 예제4-4(콜백 함수 예제(2-2)Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우)
```
var newArr2=[10,20,30].map(function(index,currentValue){
    console.log(index,currentValue);
    return currentValue +5;
});
console.log(newArr2);
```
5번째 줄에서 [15, 25, 35]가 아닌 [5, 6, 7]이라는 결과가 나옴. currentValue라고 명명한 인자의 위치가 두 번째라서 컴퓨터가 여기에 인덱스 값을 부여했기 때문. map 메서드를 호출해서 원하는 배열을 얻으려면 map 메서드에 정의된 규칙에 따라 함수를 작성해야 함. 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가짐.
### 예제4-5(콜백 함수 예제(2-3)Array.prototype.map - 구현)
```
Array.prototype.map=function(callback,thisArg){
    var mappedArr=[];
    for(var i=0; i<this.length; i++){
        var mappedValue= callback.call(thisArg || window, this[i], i, this);
        mappedArr[i]=mappedValue;
    }
    return mappedArr;
};
```
메서드 구현의 핵심은  call/apply 메서드에 있음. this에는 thisArg 값이 있을 경우에는 그 값을, 없을 경우에는 전역객체를 지정하고, 첫 번째 인자에는 메서드의 this가 배열을 가리킬 것이므로 배열의 i번째 요소 값을, 두 번째 인자에는  i 값을, 세 번째 인자에는 배열 자체를 지정해 호출함. 그 결과로 변수 mappedValue에 담겨 mappedArr의 i번째 인자에 할당 됨.
### 예제4-6(콜백 함수 내부에서의 this)
```
setTimeout(function(){console.log(this);},300);

[1,2,3,4,5].forEach(function(x){
    console.log(this);
});

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a')
    .addEventListener('click',function(e){
        console.log(this,e);
    }
);
```
각각 콜백 함수 내에서의 this를 살펴보면, 첫번째 this의 setTimeout은 내부에서 콜백 함수를 호출할 때 call 메서드의 첫 번째 인자에 전역 객체를 넘기기 때문에 콜백 함수 내부에서의 this가 전역객체를 가리킴. 두번째 this의 forEach는 별도의 인자로 this를 넘겨주지 않았기 때문에 전역객체를 가리키게 됨. 세번째 this의 addEventListener는 내부에서 콜백 함수를 call 메서드의 첫 번째 인자에 addEventListener 메서드의 this를 그대로 넘기도록 정의돼 있기 때문에 콜백 함수 내부에서의 this가 addEventListener를 호출한 주체인 HTML 엘리먼트를 가리키게 됨.
### 예제4-7(메서드를 콜백 함수로 전달한 경우)
```
var obj={
    vals:[1,2,3],
    logValues: function(v,i){
        console.log(this,v,i);
    }
};
obj.logValues(1,2);
[4,5,6].forEach(obj.logValues);
```
어떤 함수의 인자에 객체의 메서드를 전달하더라도 이는 결국 메서드가 아닌 함수일 뿐임.
### 예제4-8(콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식)
```
var obj1={
    name: 'obj1',
    func: function(){
        var self=this;
        return function(){
            console.log(self.name);
        };
    }
};
var callback=obj1.func();
setTimeout(callback,1000);
```
obj1.func 메서드 내부에서 self 변수에 this를 담고, 익명 함수를 선언과 동시에 반환. 10번째 줄에서 obj1.func를 호출하면 앞서 선언한 내부함수가 반환되어 callback 변수에 담김. 11번째 줄에서 이 callback을 setTimeout 함수에 인자로 전달하면 1초(1000ms) 뒤 callback이 실행되면서 'obj1'을 출력함. 이 방식은 실제로 this를 사용하지 않으며 번거로움.
### 예제4-9(콜백 함수 내부에서 this를 사용하지 않은 경우)
```
var obj1={
    name: 'obj1',
    func: function(){
        console.log(obj1.name);
    }
};
setTimeout(obj1.func,1000);
```
이 예제는 예제4-8에서 this를 사용하지 않았을 때의 결과. 작성한 함수를 this를 이용해 다양한 상황에 재활용할 수 없게 됨.
### 예제4-10(예제4-8의 func 함수 재활용)
```
var obj2={
    name: 'obj2',
    func: obj1.func
};
var callback2=onj.func();
setTimeout(callback2,1500);

var obj3={name:'obj3'};
var callback3=obj1.func.call(obj3);
setTimeout(callback3,2000);
```
callback2에는 obj2의 func를 실행한 결과를 담아 이를 콜백으로 사용. callback3의 경우 obj1의 func를 실행하면서 this를 obj3가 되도록 지정해 이를 콜백으로 사용. 실행시 실행 시점으로부터 1.5초후에는 'obj2'가, 실행 시점으로 부터 2초 후에는 'obj3'이 출력됨.
### 예제4-11(콜백 함수 내부의 this에 다른 값을 바인딩 하는 방법(2) - bind 메서드 활용)
```
var obj1={
    name: 'obj1',
    func: function(){
        console.log(this.name);
    }
};
setTimeout(obj1.func.bind(obj1),1000);

var obj2={name: 'obj2'};
setTimeout(obj1.func.bind(obj2),1500);
```
ES5에서 등장한 bind 메서드를 이용하여 전통적인 방식의 아쉬움을 보완함.
### 예제4-12(콜백 지옥 예시(1-1))
```
setTimeout(function(name){
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(function(name){
        coffeeList += ', '+ name;
        console.log(coffeeList);

        setTimeout(function(name){
            coffeeList += ', ' + name;
            console.log(coffeeList);

            setTimeout(function(name){
                coffeeList += ', ' + name;
                console.log(coffeeList);
            },500,'카페라떼');
        },500,'카페모카');
    },500,'아메리카노');
},500,'에스프레소');
```
0.5초 주기 마다 커피 목록을 수집하고 출력함. 각 콜백은 커피 이름을 전달하고 목록에 이름을 추가함.
### 예제4-13(콜백 지옥 해결 - 기명함수로 변환)
```
var coffeeList = '';

var addEspresso = function (name){
    coffeeList = name;
    console.log(coffeeList);
    setTimeout(addAmericano,500,'아메리카노');
};
var addAmericano = function (name) {
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addMocha,500,'카페모카');
};
var addMocha = function (name) {
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addLatte, 500, '카페라떼');
};
var addLatte = function (name) {
    coffeeList += ', ' + name;
    console.log(coffeeList);
};

setTimeout(addEspresso, 500, '에스프레소');
```
위 방식은 코드의 가독성을 높일뿐 아니라 함수 선언과 함수 호출만 구분할 수 있다면 위에서 아래로 순서대로 읽어내려가는데 어려움이 없음. 변수를 최상단으로 끌어올림으로써 외부에 노출되게 됐지만 전체를 즉시 실행 함수 등으로 감싸면 간단히 해결됨.
### 예제4-14(비동기 작업의 동기적 표현(1) - Promise(1))
```
new Promise(function(resolve) {
    setTimeout(function(){
        var name = '에스프레소';
        console.log(name);
        resolve(name);
    }, 500);
}). then(function(prevName){
    return new Promise(function(resolve){
        setTimeout(function(){
            var name = prevName + ', 아메리카노';
            console.log(name);
            resolve(name);
        }, 500);
    });
}). then(function(prevName){
    return new Promise(function(resolve){
        setTimeout(function(){
            var name = prevName + ', 카페모카';
            console.log(name);
            resolve(name);
        }, 500);
    });
}). then(function(prevName){
    return new Promise(function(resolve){
        setTimeout(function(){
            var name = prevName + ', 카페라떼';
            console.log(name);
            resolve(name);
        }, 500);
    })
})
```
ES6의 Promise를 이용한 방식. new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만 그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행괴기 전까지는 다음 또는 오류구문으로 넘어가지 않음. 따라서 비동기 작업이 완료될 때 비로소 resolve 또는 reject를 호출하는 방법으로 비동기 작업의 동기적 표현이 가능함.
### 예제4-15(비동기 작업의 동기적 표현(2) - Promise(2))
```
var addCoffee = function(name){
    return function(prevName){
        return new Promise(function(resolve){
            setTimeout(function(){
                var newName = prevName ? (prevName + ', '+ name) : name;
                console.log(newName);
                resolve(newName);
            }, 500);
        });
    };
};
addCoffee('에스프레소')()
    .then(addCoffee('아메리카노'))
    .then(addCoffee('카페모카'))
    .then(addCoffee('카페라떼'));
```
위의 예제는 예제4-14의 반복적인 내용을 함수화해서 더 짧게 표현함.
### 예제4-16(비동기 작업의 동기적 표현(3) - Generator)
```
var addCoffee = function (prevName, name){
    setTimeout(function(){
        coffeeMaker.next(prevName ? prevName + ', ' + name : name); 
    }, 500);
};
var coffeeGenerator = function* (){
    var espresso = yield addCoffee('','에스프레소');
    console.log(espresso);
    var americano = yield addCoffee(espresso, '아메리카노');
    console.log(americano);
    var mocha = yield addCoffee(americano, '카페모카');
    console.log(mocha);
    var latte = yield addCoffee(mocha, '카페라떼');
    console.log(latte);
};
var coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```
ES6의 Generator를 이용함. Generator 함수를 실행하면 Iterator가 반환됨. Iterator는 next라는 메서드를 가지고 있음. 이 next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춤. 이후 다시 next 메서드를 호출하면 앞서 멈췄던 부분부터 시작해서 그다음에 등장하는 yield에서 함수의 실행을 멈춤.
### 예제4-17(비동기 작업의 동기적 표현(4) - Promise + Async/await)
```
var addCoffee = function (name) {
    return new Promise(function (resolve) {
        setTimeout(function (){
            resolve(name);
        }, 500);
    });
};
var coffeeMaker = async function () {
    var coffeeList = '';
    var _addCoffee = async function (name) {
        coffeeList += (coffeeList ? ',' : '') + await addCoffee(name);
    };
    await _addCoffee('에스프레소');
    console.log(coffeeList);
    await _addCoffee('아메리카노');
    console.log(coffeeList);
    await _addCoffee('카페모카');
    console.log(coffeeList);
    await _addCoffee('카페라떼');
    console.log(coffeeList);
};
coffeeMaker();
```
ES2017에서는 가동성이 뛰어나고 작성법도 간단한 새로운 기능인 async/await가 추가됨. 비동기 작업을 수행하고자 하는 함수 앞에 async를 표기하고, 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await를 표기하는 것만으로 뒤의 내용을 Promise로 자동 전환하고, 해당 내용이 resolve된 이후에야 다음으로 진행함. 즉 Promise의 then과 흡사한 효과를 얻을 수 있음.























