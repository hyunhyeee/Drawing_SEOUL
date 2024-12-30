## 한성대학교 [웹프레임워크1] 교과목 팀 프로젝트

주제: 서울 지도에 사용자가 사진을 넣어 나만의 지도를 만드는 서울 여행 서비스 구축 <br>
팀명: A+ 받으면 회식 <br>
팀원: IT공과대학 소속 4명 <br>

<br><hr>

### window 및 mac 에서 실행 방법 (과정 동일)

1. `cd src\database`로 이동  
2. 터미널에서 아래 명령어를 실행하여 JSON 로그인 서버를 실행:
   ```bash
   npx json-server --watch data.json --port 3001 --host 0.0.0.0
3. 새 터미널에서 `npm start` 실행 <br/><br/>


#### npm install 후 설치 오류가 생길 경우
- `npm install`: 기본 리액트 구성 설치
- `cd src/database`: 가상 데이터 서버 폴더로 이동
- `npx json-server --watch data.json --port 3001 --host 0.0.0.0`: 가상 데이터 서버 실행
  <br/><br/>
새 터미널 열고 입력
- `npm install react-router-dom`: 페이지 이동 라이브러리 설치
- `npm install axios`: 리액트 서버 요청 라이브러리 설치
- `npm install react-icons`: 리액트 아이콘 라이브러리 설치

***

### 프로젝트 개발 환경

`"react": "18.3.1"`
<br/><br/>


***

### 파일 디렉토리

```
src/
|── assets/
|── components/
|    |── Footer.jsx
|    |── Header.jsx
|── database/
|    |── data.json
|── pages/
|    |── editmap/
|    |    |── EditMap.jsx
|    |── loginpage/
|    |    |── Login.jsx
|    |    |── SignUp.jsx
|    |── mainpage/
|    |    |── MainHome.jsx
|    |── randomstationpage/
|    |    |── RamdinStation.jsx
|    |    |── StationData.jsx
|    |── seoulmap/
|    |    |── SeoulMap.jsx
|    |── stationmemo/
|    |    |── StationMemo.jsx
|── styles/
|── App.css
|── App.js
|── index.js
|── package.json
|── README.md
```

- **assets**: 이미지 모음
- **components**: 헤더 푸터 영역 표시
- **database**: 회원가입 유저 정보 관리 데이터베이스
- **pages**: 
   - *editmap*: 자치구 별 이미지를 삽입하여 지도에 저장하는 페이지
   - *loginpage*: 로그인, 회원가입
   - *mainpage*: 메인 홈 화면 페이지
   - *randomstationpage*: 서울의 모든 지하철 역을 랜덤으로 돌리는 페이지
   - *seoulmap*: 서울의 25개 자치구 영역을 나누어 지도를 편집할 수 있는 페이지
   - *stationmemo*: 랜덤 역이 걸렸을 때 역을 저장하여 간단한 메모를 남길 수 있는 페이지