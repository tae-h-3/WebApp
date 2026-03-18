# JavaScript 기초 정리

## 1단원: JavaScript란 무엇인가
JavaScript는 웹페이지를 동적으로 만들기 위한 프로그래밍 언어이다.
HTML이 구조를 만들고, CSS가 디자인을 담당한다면,
JavaScript는 웹페이지에 '동작'을 추가한다.

예시:
- 버튼을 클릭하면 내용이 바뀜
- 알림창이 뜸
- 입력값을 처리함

JavaScript는 브라우저에서 실행되며, 별도의 설치 없이 사용할 수 있다.

---

## 2단원: 기본 문법

### 변수
데이터를 저장하는 공간

```javascript
let name = "태현";
const age = 20;
```

- let: 값이 변할 수 있음
- const: 값이 변하지 않음

### 출력
```javascript
console.log("Hello World");
```

### 조건문
```javascript
if (age > 19) {
    console.log("성인입니다");
}
```

### 반복문
```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

---

## 3단원: HTML과 JavaScript 연결

JavaScript는 HTML과 함께 사용된다.

예시:

```html
<button onclick="sayHello()">클릭</button>

<script>
function sayHello() {
    alert("안녕하세요!");
}
</script>
```

설명:
- 버튼을 클릭하면 함수가 실행됨
- alert로 알림창 출력

---

## 정리

- JavaScript는 웹페이지를 움직이게 하는 언어
- 변수, 조건문, 반복문 같은 기본 문법이 있음
- HTML과 함께 사용하여 동작을 만든다
