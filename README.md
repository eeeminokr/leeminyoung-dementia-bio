# 🧠 NRCD (GARD Portal) - 개발 기여 정리 (이민영)

이 레포지토리는 국책 연구 프로젝트인 **광주치매고호트 연구단 데이터 플랫폼(GARD portal)** 개발에 직접 기여한 소스코드를 선별하여 구성한 것입니다.  
Java 기반의 **Spring MVC 구조**와 JSP 중심의 웹 프론트, MyBatis 기반 DB 매퍼와 서비스 계층 로직이 포함되어 있습니다.

> 📅 개발 기간: 2021.12 ~ 2022.04  
> 🔗 시스템 링크: [http://gard.nrcd.re.kr:8080](http://gard.nrcd.re.kr:8080)

---

## 📁 프로젝트 디렉토리 구조 (일부 생략 포함)

```
NRCD/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/ecogard/nrcd/
│       │       ├── controller/
│       │       │   ├── SurveyController.java
│       │       │   ├── SubjectController.java
│       │       │   └── AuthController.java
│       │       ├── service/
│       │       │   ├── impl/
│       │       │   │   ├── SurveyServiceImpl.java
│       │       │   │   └── SubjectServiceImpl.java
│       │       │   └── SurveyService.java
│       │       └── vo/
│       │           ├── SurveyVO.java
│       │           ├── SubjectVO.java
│       │           └── LoginUserVO.java
│       └── resources/
│           └── mapper/
│               ├── survey-mapper.xml
│               └── subject-mapper.xml
├── webapp/
│   ├── WEB-INF/views/
│   │   ├── survey/
│   │   │   ├── surveyForm.jsp
│   │   │   └── surveyResult.jsp
│   │   ├── subject/
│   │   │   └── subjectList.jsp
│   │   └── login.jsp
│   ├── js/
│   │   ├── survey.js
│   │   └── subject.js
└── README.md
```

---

## 🔧 사용 기술 스택

- **Backend**: Java 8, Spring Framework, MyBatis
- **Frontend**: JSP, JavaScript (jQuery), CSS3
- **DB**: MySQL
- **Build**: Maven
- **환경**: Eclipse, Apache Tomcat, Linux

---

## 🧩 주요 기능 및 클래스 설명

### 📌 설문/진단 관리
- `SurveyController.java`, `SurveyServiceImpl.java`: 치매 설문 문항 출력 및 저장 로직
- `surveyForm.jsp`: 설문 항목 출력 및 동적 UI 구성 (Ajax 기반)
- `surveyResult.jsp`: 설문 결과 통계 및 시각화

### 📌 대상자 관리
- `SubjectController.java`, `SubjectServiceImpl.java`: 환자/참여자 등록 및 정보 조회
- `subjectList.jsp`: 참여자 리스트 및 상세조회 페이지
- `SubjectVO.java`: 대상자 정보 (이름, 생년월일, 설문이력 등)

### 📌 사용자 인증
- `AuthController.java`, `LoginUserVO.java`: 로그인, 세션 관리 처리

### 📌 데이터 연계
- `survey-mapper.xml`, `subject-mapper.xml`: 설문/대상자 관련 쿼리 (Insert/Select/Update)
- DB 조회 결과를 기반으로 동적 시각화 구성

---

## ✅ 개발 기여 내용

- 🧠 설문지 출력/저장 로직 전체 설계 및 구현
- 📄 대상자 관리 CRUD 화면 및 DB 연동 구현
- 📊 jQuery + JSP 기반 시각화 UI 설계 및 구현
- 🔒 사용자 인증 및 세션 인증 로직 구현
- 🧪 다수의 Mapper, VO, Service 인터페이스 구성

---

## 📍 커밋 추출 기준

- SVN 로그 기준 author가 `my.lee` 인 파일만 추출  
- 단, 실제 본인이 개발했으나 타인 명의로 커밋된 `survey.js`, `surveyForm.jsp` 등 일부 파일은 예외적으로 수동 포함함

---

📌 본 레포지토리는 실무 프로젝트 수행 경험 및 백엔드 시스템 설계 역량을 증명하기 위한 포트폴리오 용도로 구성되었습니다.
