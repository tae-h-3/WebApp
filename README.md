# 🌐 웹 프로그래밍 핵심 개념 및 환경 구축 가이드

본 문서는 웹 개발의 기초가 되는 **HTML/CSS**, 효율적인 코딩을 돕는 **Emmet**, 서비스 구조인 **MPA vs SPA**, 그리고 자바스크립트 실행 환경인 **Node.js**와 **IDE** 설정을 다룹니다.

---

## 1. HTML & CSS: 웹의 뼈대와 피부

### 📌 기본 정의
* **HTML (HyperText Markup Language):** 웹 페이지의 구조와 내용을 정의하는 마크업 언어.
* **CSS (Cascading Style Sheets):** HTML로 만든 구조에 디자인(레이아웃, 색상, 폰트 등)을 입히는 스타일 시트 언어.

### 🔍 마크업 언어 vs 메타데이터

| 구분 | 마크업 언어 (Markup Language) | 메타데이터 (Metadata) |
| :--- | :--- | :--- |
| **정의** | 문서나 데이터를 구조화하고 서식을 지정하는 언어 | 데이터 자체가 아닌, 데이터를 설명하는 정보 |
| **목적** | 문서의 구조 정의, 내용의 표현 방식 및 기능 지정 | 데이터에 대한 속성, 의미, 관계 등을 설명 |
| **형식** | 태그(tag)나 특정한 문법을 사용하여 구성 | 일반적으로 키-값(key-value) 형태로 저장 |
| **대상** | 문서 (텍스트, 이미지 등) | 데이터 (파일, 이미지, 웹 페이지) |
| **예시** | HTML, XML, Markdown, LaTeX | <meta> 태그, EXIF, JSON-LD |

### 🌐 표준 및 참조 사이트
* **[W3C](https://www.w3.org/TR/html52/):** 공식 웹 표준 제정 기관.
* **[MDN Web Docs](https://developer.mozilla.org/ko/):** 태그 목록, 사용법, 예제 및 브라우저 지원 여부 상세 설명.
* **[WHATWG](https://html.spec.whatwg.org/):** 최신 HTML Living Standard(HTML LS) 유지보수.

---

## 2. 개발 생산성 도구: Emmet

**Emmet**은 HTML, CSS 등의 마크업 코드를 빠르게 작성할 수 있도록 돕는 자동 완성 도구입니다.

* **기능:** 짧은 약어 문법을 입력하면 이를 자동으로 확장(Expansion)하여 개발 속도를 가속화합니다.
* **지원 도구:** VS Code, Sublime Text, IntelliJ 등 대부분의 최신 편집기에서 기본 지원 또는 플러그인 형태로 제공됩니다.
* **리소스:** [Emmet Cheat-sheet](https://docs.emmet.io/cheat-sheet/)

---

## 3. 웹 애플리케이션 아키텍처: MPA vs SPA

### 🔄 개념 및 라이프사이클 비교
* **MPA (Multi-page App):** * 사용자가 페이지 이동 시마다 서버에 새로운 HTML을 요청합니다.
  * 전체 페이지를 다시 불러오는 **Page Reloads** 방식입니다.
* **SPA (Single-page App):** * 초기 요청 시 한 번만 HTML을 받아오고, 이후에는 **AJAX**를 통해 필요한 데이터(JSON)만 서버에 요청합니다.
  * 브라우저에서 필요한 부분만 동적으로 업데이트합니다.

### 📂 구조적 차이
* **MPA:** 다수의 HTML 파일 존재 (index.html, about.html 등)
* **SPA:** 하나의 `index.html` 기반으로 자바스크립트(`app.js`)가 라우팅과 렌더링을 제어.
* **History 제어:** `window.history.pushState`를 통해 새로고침 없이 URL을 변경하고 브라우저 기록을 관리합니다.

---

## 4. Node.js: 자바스크립트 런타임 환경

Node.js는 자바스크립트가 브라우저 외부(서버 등)에서도 동작할 수 있게 지원하는 **실행 환경(Runtime)**입니다.

### 📋 용어 정리
| 용어 | Node.js에서의 의미 |
| :--- | :--- |
| **Platform** | Node.js가 실행되는 OS(Windows, Linux)나 클라우드 |
| **Environment** | 소프트웨어 실행을 위해 구성된 조건 (로컬, 운영 환경 등) |
| **Framework** | 소프트웨어 개발을 위한 기반 구조 (예: Express.js) |
| **Runtime** | 자바스크립트를 서버에서 실행하게 하는 환경 (**Node.js**) |

### 🚀 설치 및 확인
1. **Node.js 홈페이지**에서 LTS 버전을 권장 설치합니다.
2. 터미널에서 버전 확인:
   ```bash
   node -v
   npm -v