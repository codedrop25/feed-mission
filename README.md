# 소셜 미디어 피드 백엔드
## AUTHOR, 김하림

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
git clone https://github.com/codedrop25/feed-mission.git
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

## 필요한 추가 작업(개발자 영역)
```
1. 데이터 베이스 I/O 분리 작업(마스터 슬레이브), 포스트 테이블 샤딩
2. 인메모리 캐싱 사용 - 피드 서비스의 공용 포스트들(인기게시물, 특정 게시물) 캐싱하여 RDB hit 최소화
3. 대기 큐, 배치 처리 - 게시글은 실시간 처리가 불필요, 배치 처리로 벌크 인설트 처리
```



