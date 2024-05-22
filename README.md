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
## chap.5
### 예제5-1(외부 함수의 변수를 참조하는 내부 함수(1))
```
var outer = function () {
    var a = 1;
    var inner = function () {
        console.log(++a);
    };
    inner();
};
outer();
```
위의 예제에서는 outer 함수에서 변수 a를 선언했고, outer의 내부함수인 inner 함수에서 a의 값을 1만큼 증가시킨 다음 출력함. inner 함수 내부에서는 a를 선언하지 않았기 때무에 enviromentRecord에서 값을 찾지 못하므로 outerEnviromentReference에 지정된 상위 컨텍스트인 outer의 LexicalEnviroment에 접근 해서 다시 a를 찾음. 4번째 줄에서는 2를 출력함. outer 함수의 실행 컨텍스트가 종료되면 LexicalEnviroment에 저장된 식별자들(a, inner)에 대한 참조를 지움.
### 예제5-2(외부 함수의 변수를 참조하는 내부 함수(2))
```
var outer = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner();
};
var outer2 = outer();
console.log(outer2);
```
6번째 줄에서는 inner 함수를 실행한 결과를 리턴하고 있으므로 결과적으로 outer 함수의 실행 컨텍스트가 종료된 시점에는 a 변수를 참조하는 대상이 없어짐. 일반적인 함수 및 내부함수에서의 동작과 차이가 없음.
### 예제5-3(외부 함수의 변수를 참조하는 내부 함수(3))
```
var outer = function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner;
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());
```
6번째 줄에서 inner 함수의 실행결과가 아닌 inner 함수 자체를 반환함. outer 함수의 실행 컨텍스트가 종료될 때 outer2 변수는 outer의 실행 결과인 inner 함수를 참조하게 됨. 이후 9번째에서 outer2를 호출하면 앞서 반환된 함수인 inner가 실햄됨. 
### 예제5-4(return 없이도 클로저가 발생하는 다양한 경우)
```
(function () {  //(1) setInterval/setTimeout
    var a = 0;
    var intervalId = null;
    var inner = function () {
        if (++a >= 10) {
            clearInterval(intervalId);
        }
        console.log(a);
    };
    intervalId = setInterval(inner, 1000);
})();

(function () {  //(2) evenListner
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';
    button.addEventListener('click', function() {
        console.log(++count, 'times clicked');
    });
    document.body.appendChild(button);
})();
```
별도의 외부객체인 window의 메서드에 전달할 콜백 함수 내부에서 지역변수를 참조함. 별도의 외부객체인 DOM의 메서드에 등록할 handler 함수 내부에서 지역변수를 참조함. 두 상황 모두 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 클로저임.
### 예제5-5(클로저의 메모리 관리)
```
//(1) return에 의한 클로저의 메모리 해제
var outer = (function () {
    var a = 1;
    var inner = function () {
        return ++a;
    };
    return inner;
}) ();
console.log(outer());
console.log(outer());
outer = null;
//(2) setInterval에 의한 클로저의 메모리 해제
(function () {
    var a = 0;
    var intervalId = null;
    var inner = function () {
        if (++a >= 10) {
            clearInterval(intervalId);
            inner = null;
        }
        console.log(a);
    };
    intervalId = setInterval(inner, 1000);
})();
//(3) evenListener에 의해 클로저의 메모리 해제
(function () {
    var count = 0;
    var button = document.createElement('button');
    button.innerText = 'click';

    var clickHandler = function () {
        console.log(++count, 'times clicked');
        if (count >= 10){
            button.removeEventListener('click', clickHandler);
            clickHandler = null;
        }
    };
    button.addEventListener('click', clickHandler);
    document.body.appendChild(button);
})();
```
의도대로 설계한 '메모리 소모'에 대한 관리법만 잘 파악해서 적용해야함. 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생함. 필요성이 사라진 시점에는 더는 메모리를 소모하지 않게 해주면 됨. 참조 카운트를 0으로 만들면 언젠간 GC가 수거해갈 것이고, 이때 소모됐던 메모리가 회수됨. 참조 카운트를 0으로 만들기 위해선 식별자에 참조형이 아닌 기본형 데이터를 할당하면 됨.
### 예제5-6
```
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', function () {
        alert('your choice is ' + fruit);
    });
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```
fruits 변수를 순회하며 li를 생성하고, 각 li를 클릭하면 해당 리스너에 기억된 콜백 함수를 실행하게 함.
### 예제5-7(콜백 함수와 클로저(2))
```
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruit);
    $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```
공통 함수로 쓰고자 콜백 함수를 외부로 꺼내어 alertFruit라는 변수에 담았음. 이제 alertFruit을 직접 실행할 수 있음. 콜백 함수의 인자에 대한 제어권을 addEventListener가 가진 상태이며, addEventListener는 콜백 함수를 호출할 때 첫 번째 인자에 '이벤트 객체'를 주입하기 때문.
### 예제5-8(콜백 함수와 클로저(3))
```
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruit.bind(null, fruit));
    $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```
bind 메서드를 활용함. 이벤트 객체가 인자로 넘어오는 순서가 바뀌는 점 및 함수 내부에서의 this가 원래의 그것과 달라지는 점은 감안해야함. 
### 예제5-9(콜백 함수와 클로저(4))
```
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruitBuilder = function (fruit) {
    return function () {
        alert('your choice is ' + fruit);
    };
};
fruits.forEach(function (fruit) {
    var $li = document.createElement('li');
    $li.innerText = fruit;
    $li.addEventListener('click', alertFruitBuilder(fruit));
    $ul.appendChild($li);
});
document.body.appendChild($ul);
```
고차함수를 활용함. 이 함수의 실행 결과가 다시 함수가 되며, 이렇게 반환된 함수를 리스너에 콜백 함수로써 전달함. 이후 언젠가 클릭 이벤트가 발생하면 비로소 이 함수의 실행 컨텍스트가 열리면서 alertFruitBuilder의 인자로 넘어온 fruit를 outerEnviromentReference에 의해 참조할 수 있음.
### 예제5-10(간단한 자동차 객체)
```
var car = {
    fuel: Math.ceil(Math.random()*10+10),
    power: Math.ceil(Math.random()*3+2),
    moved: 0,
    run: function () {
        var km = Math.ceil(Math.random()*6);
        var wasteFuel = km / this.power;
        if(this.fuel < wasteFuel) {
            console.log('이동불가');
            return;
        }
        this.fuel -= wasteFuel;
        this.moved += km;
        console.log(km + 'km 이동 (총 ' + this.moved + 'km)');
    }
};
```
car 변수에 객체를 직접 할당함. fuel과 power는 무작위로 생성하고, moved라는 프로퍼티에 총 이동거리를 부여했으며, run 메서드를 실행할 때마다 car 객체의 fuel, moved값이 변하게 함.
### 예제5-11(클로저로 변수를 보호한 자동차 객체(1))
```
var createCar = function () {
    var fuel = Math.ceil(Math.random() * 10 + 10);
    var power = Math.ceil(Math.random() * 3 + 2);
    var moved = 0;
    return {
        get moved () {
            return moved;
        },
        run: function () {
            var km = Math.ceil(Math.random() * 6);
            var wasteFuel = km / power;
            if(fuel < wasteFuel) {
                console.log('이동불가');
                return;
            }
            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel);
        }
    };
};
var car = createCar();

car.run();
car.run();
car.run();
```
createCAR라는 함수를 실행함으로써 객체를 생성함. fuel, power 변수는 비공개 멤버로 지정해 외부에서의 접근을 제한했고, moved 변수는 getter만을 부여함으로써 읽기 전용 속성을 부여함. 외부에서는 오직 run 메서드를 실행하는 것과 현재으 moved 값을 확인하는 두 가지 동작만 할 수 있음.
### 예제5-12(클로저로 변수를 보호한 자동차 객체(2))
```
var createCar = function () {
    var fuel = Math.ceil(Math.random() * 10 + 10);
    var power = Math.ceil(Math.random() * 3 + 2);
    var moved = 0;
    var publicMembers ={
        get moved () {
            return moved;
        },
        run: function () {
            var km = Math.ceil(Math.random() * 6);
            var wasteFuel = km / power;
            if(fuel < wasteFuel) {
                console.log('이동불가');
                return;
            }
            fuel -= wasteFuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel);
        },
    };
    Object.freeze(publicMembers);
    return publicMembers;
};

var car = createCar();

car.run();
car.run();
car.run();
car.run();
car.run();
```
이전 코드에서는 run 메서드를 다른 애용으로 덮어씌우는 어뷰징은 가능한 상태였음. 이런 어뷰징까지 막기 위해서는 객체를 return하기 전에 미리 변경할 수 없게끔 해야함.
### 예제5-13(bind 메서드를 활용한 부분 적용 함수)
```
var add = function () {
    var result = 0;
    for (var i = 0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
};
var addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));
```
addPartial 함수는 인자 5개를 미리 적용하고, 추후 추가적으로 인자들을 전달하면 모든 인자를 모아 원래의 함수가 실행되는 부분 적용 함수. add 함수는 this를 사용하지 않으므로 bind 메서드만으로도 문제 없이 구현됨. 그러나 this의 값을 변경할 수 밖에 없기 때문에 메서드에서는 사용할 수 없음.
### 예제5-14(부분 적용 함수 구현(1))
```
var partial = function () {
    var originalPartialArgs = arguments;
    var func = originalPartialArgs[0];
    if (typeof func !== 'function') {
        throw new Error('첫 번째 인자가 함수가 아닙니다.');
    }
    return function () {
        var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
        var restArgs = Array.prototype.slice.call(arguments);
        return func.apply(this, partialArgs.concat(restArgs));
    };
};

var add = function () {
    var result = 0;
    for (var i = 0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
};
var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

var dog = {
    name: '강아지',
    greet: partial(function(prefix, suffix){
        return prefix + this.name + suffix;
    }, '왈왈, ')
};
dog.greet('입니다!');
```
간단한 부분 적용 함수. 첫 번째 인자에는 원본 함수를, 두 번째 인자 이후로부터는 미리 적용할 인자들을 전달하고, 반환할 함수에서는 다시 나머지 인자들을 받아 이들을 한데 모아 원본 함수를 호출함. 또한 실행 시점의 this를 그대로 반영함으로써 this에는 아무런 영향을 주지 않게 됨.
### 예제5-15(부분 적용 함수 구현(2))
```
Object.defineProperty(window, '_', {
    value: 'EMPTY_SPACE',
    writable: false,
    configurable: false,
    enumerable: false,
});

var partial2 = function () {
    var originalPartialArgs = arguments;
    var func = originalPartialArgs[0];
    if (typeof func !== 'function') {
        throw new Error('첫 번째 인자가 함수가 아닙니다.');
    }
    return function () {
        var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
        var restArgs = Array.prototype.slice.call(arguments);
        for (var i = 0; i < partialArgs.length; i++){
            if(partialArgs[i] === _){
                partialArgs[i] = restArgs.shift();
            }
        }
        return func.apply(this, partialArgs.concat(restArgs));
    };
};

var add = function () {
    var result = 0;
    for (var i = 0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
};
var addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10));

var dog = {
    name: '강아지',
    greet: partial2(function(prefix, suffix){
        return prefix + this.name + suffix;
    }, '왈왈, ')
};
dog.greet(' 배고파요!');
```
'비워놓음'을 표시하기 위해 미리 전역객체에 _ 라는 프로퍼티를 준비하면서 삭제 변경 등의 접근에 대한 방어 차원에서 여러 가지 프로퍼티 속성을 설정했음. 처음에 넘겨준 인자들중 _로 비워놓은 공간마다 나중에 넘어온 인자들이 차례대로 끼워넣도록 구현했음.
### 예제5-16(부분 적용 함수 - 디바운스)
```
var debounce = function (eventName, func, wait) {
    var timeoutId = null;
    return function (event) {
        var self = this;
        console.log(eventName, 'event 발생');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func.bind(self, event), wait);
    };
};

 var moveHandler = function (e) {
    console.log('move event 처리');
 };
 var wheelHandler = function (e) {
    console.log('wheel event 처리');
 };
 document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
 document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));
```
디바운스 함수는 출력 용도로 지정한 eventName과 실행할 함수, 마지막으로 발생한 이벤트인지 여부를 판단하기 위한 대기시간을 받음. 내부에서는 timeoutId 변수를 생성하고, 클로저로 EventListener에 의해 호출될 함수를 반환함. 4번째 줄에서 setTimeout을 사용하기 위해 this를 별도의 변수에 담고, 6번째 줄에서 무조건 대기큐를 초기화하게 했음. 마지막으로 7번째 줄에서 setTimeout으로 wait 시간만큼 지연시킨 다음, 원래의 func를 호출하는 형태임.
### 예제5-17(커링 함수(1))
```
var curry3 = function (func) {
    return function (a) {
        return function (b) {
            return func(a, b);
        };
    };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8));
console.log(getMaxWith10(25));

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8));
console.log(getMinWith10(25));
```
부분 적용 함수와 달리 커링 함수는 필요한 상황에 직접 만들어 쓰기 용이함. 필요한 인자 개수만큼 함수를 만들어 계속 리턴해주다가 마지막에만 조합해서 리턴해주면 됨. 다만 인자가 많아질수록 가독성이 떨어진다는 단점이 있음.
### 예제5-18(커링 함수(2))
```
var curry5 = function (func) {
    return function (a) {
        return function (b) {
            return function (c) {
                return function (d) {
                    return function (e) {
                        return func(a, b, c, d, e);
                    };
                };
            };
        };
    };
};
var getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5));
```
위의 코드는 인자가 많아서 가독성이 떨어짐. ES6에서는 아래와 같이 화살표 함수를 써서 같은 내용을 단 한줄에 표기 가능함.
```
var curry5 = func => a => b => c=> d => e => func(a, b, c, d, e);
```
