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
## 예제4-3(콜백 함수 예제(2-1)Array.prototype.map)
```
var newArr=[10,20,30] .map(function(currentValue,index){
    console.log(currentValue,index);
    return currentValue +5;
});
console.log(newArr);
```
배열 [10, 20, 30]의 각 요소를 처음부터 하나식 꺼내어 콜백 함수를 실행. 세 번째에 대한 콜백 함수까지 실행을 마치고 나면, [15, 25, 35]라는 새로운 배열이 만들어져서 변수 newArr에 담기고, 이 값이 5번째 줄에서 출력됨.
## 예제4-4(콜백 함수 예제(2-2)Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우)
```
var newArr2=[10,20,30].map(function(index,currentValue){
    console.log(index,currentValue);
    return currentValue +5;
});
console.log(newArr2);
```
5번째 줄에서 [15, 25, 35]가 아닌 [5, 6, 7]이라는 결과가 나옴. currentValue라고 명명한 인자의 위치가 두 번째라서 컴퓨터가 여기에 인덱스 값을 부여했기 때문. map 메서드를 호출해서 원하는 배열을 얻으려면 map 메서드에 정의된 규칙에 따라 함수를 작성해야 함. 콜백 함수의 제어권을 넘겨받은 코드는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 가짐.
## 예제4-5(콜백 함수 예제(2-3)Array.prototype.map - 구현)
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
























