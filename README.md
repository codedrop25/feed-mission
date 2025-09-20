# 소셜 미디어 피드 백엔드

## 개요

투썬 입사 과제 입니다.

## 주요 기능

- 회원가입 및 JWT 기반 로그인
- 사용자 프로필 조회
- 게시물 CRUD
- 카테고리 목록 조회
- 게시물 목록 조회 (페이지네이션, 카테고리 필터링, 정렬 기능 포함)
- Swagger를 이용한 API 문서 자동화

## 디렉토리 구조

```
feed-backend
├── src
│   ├── categories    # 게시물 카테고리 (목록 조회, 초기 데이터 생성)
│   ├── config        # 설정 정보
│   ├── posts         # 게시물 CRUD 및 목록 조회 로직
│   ├── users         # 회원가입 및 프로필 조회 로직(로그인, JWT 전략)
│   ├── app.module.ts # 루트 모듈
│   └── main.ts       # 애플리케이션 시작점
├── docker-compose.yml # MySQL을 위한 Docker 설정 파일
├── .env               # 환경 변수 파일
└── README.md          # 본 파일
```

## 실행 방법

### 사전 준비

- [Node.js](https://nodejs.org/en/) (v22 이상)
- [Docker](https://www.docker.com/)

### 1. 저장소 복제

```bash
git clone <저장소 URL>
cd feed-backend
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 데이터베이스 실행

Docker 컨테이너로 MySQL 데이터베이스를 실행합니다.

```bash
docker-compose up -d
```

### 4. 애플리케이션 실행

애플리케이션이 `http://localhost:3000`에서 시작됩니다.

```bash
npm run start:dev
```

### 5. API 문서 확인

애플리케이션이 실행되면, 아래 주소에서 Swagger UI를 통해 API 문서를 확인하고 테스트할 수 있습니다.
[http://localhost:3000/api](http://localhost:3000/api)
