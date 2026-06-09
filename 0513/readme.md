AI 여행 플래너 사이트 : https://webapp-57951.web.app
---
# Firebase 사용 가이드

# 📋 전체 흐름 한눈에 보기

```
1. 사전 준비 (Node.js, VS Code, Git 설치)
2. 깃허브에서 코드 받기
3. 패키지 설치
4. Firebase 프로젝트 생성
5. Firebase 서비스 설정 (Auth, Firestore)
6. Firebase 설정값 코드에 적용
7. Gemini API 키 발급
8. Google Maps API 키 발급
9. .env 파일 만들기
10. 로컬에서 테스트
11. Firebase Hosting 설정
12. 배포!
```

**총 소요 시간: 약 30~40분**

---

# 1️⃣ 사전 준비 (한 번만)

## 1-1. Node.js 설치

1. https://nodejs.org 접속
2. **LTS 버전** 다운로드 (왼쪽 초록 버튼)
3. 설치 (계속 "다음" 클릭)
4. 설치 확인:
버전 숫자 나오면 성공
    
    ```bash
    node --versionnpm --version
    ```
    

## 1-2. Git 설치

1. https://git-scm.com 접속
2. Download 클릭 → 설치 (다 기본값으로 OK)
3. 확인:
    
    ```bash
    git --version
    ```
    

## 1-3. VS Code 설치 (코드 에디터)

1. https://code.visualstudio.com 접속
2. Download → 설치

---

# 2️⃣ 깃허브에서 코드 받기

## 2-1. 코드 다운로드 위치 선택

원하는 폴더(예: `바탕화면` 또는 `Documents`)에서 작업할 거예요.

## 2-2. 터미널 열기

**Windows:**

- 원하는 폴더에서 **Shift + 우클릭** → "여기에서 터미널 열기"
- 또는 폴더 안 빈 곳 우클릭 → "Git Bash Here"

**Mac:**

- Finder에서 폴더 우클릭 → "폴더에서 새로운 터미널 열기"

## 2-3. 코드 받기 (Clone)

```bash
git clone [깃허브_레포지토리_주소]
```

> 💡 깃허브 주소는 레포지토리 페이지에서 **초록색 "Code" 버튼** 클릭 후 복사
> 

예시:

```bash
git clone https://github.com/사용자이름/travel-planner.git
```

## 2-4. 폴더로 이동

```bash
cd travel-planner
```

## 2-5. VS Code로 열기

```bash
code .
```

(점은 "현재 폴더"라는 뜻)

---

# 3️⃣ 패키지 설치

VS Code 안에서 **Ctrl + `** (백틱) 눌러서 터미널 열기

```bash
npm install
```

> ⏱ 1~3분 정도 걸려요. 빨간 글씨가 나와도 마지막에 에러 없이 끝나면 OK
> 

성공 메시지:

```
added XXX packages in XXs
```

---

# 4️⃣ Firebase 프로젝트 생성

## 4-1. Firebase 콘솔 접속

https://console.firebase.google.com

구글 계정으로 로그인

## 4-2. 프로젝트 추가

1. **"프로젝트 추가"** 클릭
2. 프로젝트 이름 입력 (예: `travel-planner`)
3. **"계속"** 클릭
4. Google Analytics → **"이 프로젝트에서 Google Analytics 사용 설정"** 끄기
5. **"프로젝트 만들기"** 클릭
6. 30초 대기 → **"계속"**

## 4-3. 웹 앱 등록 (⭐ 중요!)

1. 프로젝트 메인 화면에서 **`</>`** 아이콘 클릭
2. 앱 닉네임 입력 (예: `travel-planner-web`)
3. "Firebase Hosting 설정" 체크박스는 **체크 안 함** (나중에 따로 함)
4. **"앱 등록"** 클릭

## 4-4. firebaseConfig 복사 (⭐ 매우 중요!)

이런 코드가 나옵니다:

```jsx
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

**메모장에 통째로 복사해두세요!** (나중에 사용)

---

# 5️⃣ Firebase 서비스 활성화

## 5-1. Authentication 활성화

1. 좌측 메뉴 → **"Build" → "Authentication"**
2. **"시작하기"** 클릭
3. **"Sign-in method"** 탭 클릭
4. **"이메일/비밀번호"** 클릭 → **"사용 설정"** ON → **저장**
5. (선택) **"Google"** 클릭 → 사용 설정 ON → 지원 이메일 선택 → **저장**

## 5-2. Firestore Database 만들기

1. 좌측 메뉴 → **"Build" → "Firestore Database"**
2. **"데이터베이스 만들기"** 클릭
3. 버전 선택 → **Standard 버전** ⭐
4. 위치: **`asia-northeast3 (Seoul)`** 선택
5. **"다음"** 클릭
6. **"프로덕션 모드로 시작"** 선택
7. **"사용 설정"** 클릭
8. 30초 대기

## 5-3. Firestore 보안 규칙 설정 (⭐ 매우 중요!)

1. Firestore Database → **"규칙"** 탭 클릭
2. 기존 내용 **전부 삭제**
3. 아래 코드 붙여넣기:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /trips/{tripId} {
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }

    match /users/{userId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null
        && request.auth.uid == userId;
      allow delete: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

1. **"게시"** 버튼 클릭 (꼭!)

---

# 6️⃣ Firebase 설정값 코드에 적용

VS Code로 돌아와서:

## 6-1. `src/firebase/config.js` 파일 열기

## 6-2. 4-4에서 복사한 값으로 교체

```jsx
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "여기에_본인_apiKey",
  authDomain: "여기에_본인_authDomain",
  projectId: "여기에_본인_projectId",
  storageBucket: "여기에_본인_storageBucket",
  messagingSenderId: "여기에_본인_messagingSenderId",
  appId: "여기에_본인_appId"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
```

**Ctrl + S** 저장!

---

# 7️⃣ Gemini API 키 발급

## 7-1. Google AI Studio 접속

https://aistudio.google.com/app/apikey

## 7-2. API 키 만들기

1. **"Create API key"** 클릭
2. 새 프로젝트 선택 또는 기존 프로젝트 선택
3. 발급된 키 복사 (`AIzaSy...`)
4. **메모장에 보관**

> ⚠️ 절대 다른 사람과 공유 금지! 노출되면 자동 차단됨
> 

---

# 8️⃣ Google Maps API 키 발급

## 8-1. Google Cloud Console 접속

결제 없는 장소  ([**Google Maps Platform](https://mapsplatform.google.com/intl/ko_kr/))**

[https://mapsplatform.google.com/intl/ko_kr/maps-demo-key/](https://mapsplatform.google.com/intl/ko_kr/maps-demo-key/)

https://console.cloud.google.com

## 8-2. 프로젝트 선택 또는 생성

상단 프로젝트 드롭다운 → 새 프로젝트 만들거나 기존 선택

## 8-3. 결제 계정 연결 (⭐ 필수!)

1. 좌측 메뉴 → **"결제"**
2. **"결제 계정 연결"** → 카드 정보 등록

> 💰 **걱정 마세요!** 월 $200 무료 크레딧 자동 적용. 개인 사용은 사실상 무료.
> 

## 8-4. Maps JavaScript API 활성화

1. 좌측 메뉴 → **"API 및 서비스" → "라이브러리"**
2. **"Maps JavaScript API"** 검색
3. 클릭 → **"사용"** 버튼 클릭

## 8-5. Geocoding API 활성화 (지도 좌표용)

1. 같은 라이브러리에서 **"Geocoding API"** 검색
2. 클릭 → **"사용"** 버튼 클릭

## 8-6. API 키 발급

1. **"API 및 서비스" → "사용자 인증 정보"**
2. **"사용자 인증 정보 만들기" → "API 키"**
3. 발급된 키 복사 → 메모장에 보관

---

# 9️⃣ .env 파일 만들기 (⭐ 매우 중요!)

## 9-1. 프로젝트 루트에 `.env` 파일 만들기

VS Code 좌측 파일 탐색기에서:

1. `package.json`이 있는 폴더에서
2. 우클릭 → **"새 파일"**
3. 파일명: **`.env`** (점 빼먹지 말기!)

## 9-2. 내용 입력

```
VITE_GEMINI_API_KEY=여기에_Gemini_키
VITE_GOOGLE_MAP_API_KEY=여기에_구글지도_키
```

> ⚠️ 주의사항:
> 
> - **따옴표 X**: `VITE_GEMINI_API_KEY=AIzaSy...` ✅
> - **공백 X**: `VITE_GEMINI_API_KEY = AIzaSy...` ❌
> - 등호 옆에 공백 없이 바로!

## 9-3. 저장

**Ctrl + S**

> 💡 `.gitignore`에 `.env`가 들어있어서 깃허브에 안 올라가요. 안전!
> 

---

# 🔟 로컬에서 테스트

## 10-1. 개발 서버 실행

터미널에서:

```bash
npm run dev
```

성공하면:

```
VITE v5.4.21  ready in 271 ms

➜  Local:   http://localhost:3000/
```

## 10-2. 브라우저에서 확인

`http://localhost:3000` 접속

체크 사항:

- [ ]  홈페이지가 잘 떠요?
- [ ]  회원가입 됨?
- [ ]  로그인 됨?
- [ ]  여행 만들기 → AI 일정 생성 됨?
- [ ]  지도 보임?

## 10-3. 문제 발생 시

**F12 → Console 탭**에서 빨간 에러 확인:

| 에러 | 해결 |
| --- | --- |
| `Firebase 에러` | 6단계 다시 (config.js 키 확인) |
| `Gemini API 에러` | 7단계 다시 + .env 재시작 |
| `지도 안 뜸` | 8단계 다시 (API 활성화 확인) |
| `permission-denied` | 5-3 보안 규칙 게시했는지 확인 |
| `requires an index` | 콘솔에 나온 링크 클릭 → 인덱스 만들기 |

## 10-4. 서버 종료

터미널에서 **Ctrl + C**

---

# 1️⃣1️⃣ Firebase Hosting 설정 (배포 준비)

## 11-1. Firebase CLI 설치 (한 번만)

새 터미널에서:

```bash
npm install -g firebase-tools
```

> ⚠️ Mac/Linux 권한 에러 시: `sudo npm install -g firebase-tools`
> 

확인:

```bash
firebase --version
```

## 11-2. Firebase 로그인 (한 번만)

```bash
firebase login
```

1. 엔터 → 브라우저 자동 열림
2. Firebase 사용 중인 **구글 계정으로 로그인**
3. **"허용"** 클릭
4. 터미널로 돌아오기

## 11-3. 프로젝트 폴더로 이동

```bash
cd travel-planner
```

(이미 그 폴더면 생략)

## 11-4. Hosting 초기화

```bash
firebase init hosting
```

### 질문에 답하기:

**Q1**: "Please select an option"

→ 방향키로 **"Use an existing project"** 선택 → 엔터

**Q2**: "Select a default Firebase project"

→ **본인 프로젝트 선택** → 엔터

**Q3**: "What do you want to use as your public directory? (public)"

→ **`dist`** 입력 → 엔터 ⭐

**Q4**: "Configure as a single-page app? (y/N)"

→ **`y`** 입력 → 엔터 ⭐

**Q5**: "Set up automatic builds and deploys with GitHub? (y/N)"

→ **`N`** 또는 그냥 엔터

**Q6**: "File dist/index.html already exists. Overwrite? (y/N)"

→ **`N`** 또는 그냥 엔터 ⭐⭐⭐ (절대 Yes 누르지 마세요!)

성공 메시지:

```
✔  Firebase initialization complete!
```

---

# 1️⃣2️⃣ 배포!

## 12-1. 빌드

```bash
npm run build
```

성공:

```
✓ built in 4.32s
```

## 12-2. 배포

```bash
firebase deploy --only hosting
```

## 12-3. 완료!

```
✔  Deploy complete!

Hosting URL: https://프로젝트ID.web.app
```

**이 URL이 본인 사이트!** 🎉

브라우저에서 접속해보세요!

---

# 1️⃣3️⃣ 배포 후 추가 설정 (⭐ 필수!)

배포된 사이트에서 API가 정상 작동하려면:

## 13-1. Firebase Authentication 도메인 확인

1. Firebase 콘솔 → Authentication → Settings → 승인된 도메인
2. 다음이 있는지 확인 (자동으로 들어있을 수도):
    - `프로젝트ID.web.app`
    - `프로젝트ID.firebaseapp.com`

없으면 **"도메인 추가"** 클릭

## 13-2. 구글 지도 API 도메인 제한 추가

1. https://console.cloud.google.com
2. **API 및 서비스 → 사용자 인증 정보**
3. 본인 API 키 클릭
4. **애플리케이션 제한사항** → **HTTP 리퍼러**
5. 도메인 추가:
    
    ```
    http://localhost:3000/*https://프로젝트ID.web.app/*https://프로젝트ID.firebaseapp.com/*
    ```
    
6. **저장**

---

# 🎉 완료!

이제 누구나 `https://프로젝트ID.web.app` 으로 접속해서 사용 가능!

---

# 🔄 나중에 코드 수정 후 다시 배포하려면?

**딱 2개 명령어만!**

```bash
npm run build
firebase deploy --only hosting
```

또는 한 줄로:

```bash
npm run build && firebase deploy --only hosting
```

---

# ⚡ 빠른 체크리스트

처음부터 끝까지 따라하면서 체크:

- [ ]  **1단계**: Node.js, Git, VS Code 설치
- [ ]  **2단계**: `git clone`으로 코드 다운로드
- [ ]  **3단계**: `npm install`
- [ ]  **4단계**: Firebase 프로젝트 생성 + firebaseConfig 메모
- [ ]  **5단계**: Authentication 활성화 + Firestore 만들기 + 보안 규칙 게시
- [ ]  **6단계**: `config.js`에 firebaseConfig 붙여넣기
- [ ]  **7단계**: Gemini API 키 발급
- [ ]  **8단계**: Google Cloud → Maps + Geocoding API 활성화 + 키 발급
- [ ]  **9단계**: `.env` 파일 만들고 두 키 넣기
- [ ]  **10단계**: `npm run dev`로 로컬 테스트
- [ ]  **11단계**: `firebase login` + `firebase init hosting`
- [ ]  **12단계**: `npm run build` + `firebase deploy --only hosting`
- [ ]  **13단계**: 도메인 허용 설정 (Auth + 지도 API)

---

# 🆘 자주 발생하는 문제 모음

### "Firebase 에러: invalid-api-key"

→ 6단계 `config.js` 다시 확인. 따옴표, 쉼표 빠진 거 없나?

### "Permission denied"

→ 5-3 보안 규칙 **"게시"** 버튼 안 눌렀을 가능성

### "지도가 안 떠요"

→ 8-3 결제 계정 등록 안 했거나, 8-4/8-5 API 활성화 안 함

### "AI 일정 안 만들어짐"

→ `.env` 파일 위치 확인 (package.json과 같은 폴더) + 서버 재시작

### "배포는 됐는데 Welcome to Firebase Hosting만 보임"

→ 11-4 Q6에서 Yes 누름. 다시 `npm run build` + `firebase deploy`

---

이대로 따라하시면 **30~40분이면 모든 게 인터넷에서 작동**해요!

진행하시다가 막히면 어느 단계에서 막혔는지 알려주세요! 🚀