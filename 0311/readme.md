# React 기초 정리

## 1. React란?

React는 사용자 인터페이스(UI)를 만들기 위한 JavaScript 라이브러리이다.
컴포넌트 기반 구조를 사용하여 재사용성과 유지보수성을 높인다.

------------------------------------------------------------------------

## 2. 컴포넌트 (Component)

React의 핵심 개념으로, UI를 독립적이고 재사용 가능한 단위로 나눈 것

### 함수형 컴포넌트 예시

``` jsx
function Hello() {
  return <h1>Hello, World!</h1>;
}
```

------------------------------------------------------------------------

## 3. JSX

JavaScript 안에서 HTML처럼 작성할 수 있는 문법

``` jsx
const element = <h1>Hello, React!</h1>;
```

특징: - 반드시 하나의 부모 요소로 감싸야 함 - class → className 사용

------------------------------------------------------------------------

## 4. Props

부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용

``` jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

------------------------------------------------------------------------

## 5. State

컴포넌트 내부에서 관리되는 데이터

``` jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

------------------------------------------------------------------------

## 6. 이벤트 처리

React에서는 카멜케이스 사용

``` jsx
<button onClick={handleClick}>클릭</button>
```

------------------------------------------------------------------------

## 7. 조건부 렌더링

조건에 따라 UI를 다르게 출력

``` jsx
{isLoggedIn ? <Logout /> : <Login />}
```

------------------------------------------------------------------------

## 8. 리스트 렌더링

배열 데이터를 반복 출력

``` jsx
const items = [1,2,3];

items.map(item => <li key={item}>{item}</li>);
```

------------------------------------------------------------------------

## 9. useEffect

컴포넌트 생명주기 관리

``` jsx
import { useEffect } from 'react';

useEffect(() => {
  console.log("렌더링됨");
}, []);
```

------------------------------------------------------------------------

## 10. 정리

-   React는 컴포넌트 기반 구조
-   Props: 외부 데이터
-   State: 내부 데이터
-   JSX로 UI 작성
-   Hook(useState, useEffect) 활용