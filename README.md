# Narak

주식 투자에 관심 있는 사들을 위한 모의주식투자 플랫폼입니다.  
실제 주식 데이터를 기반으로 투자 연습이 가능하며, 모바일 환경을 고려한 반응형 UI로 구성되어 있습니다.

<br/>

## 프로젝트 개요

- **목적**: 주식 투자 실력을 겨루기 위한 모의 투자 플랫폼 제작
- **기간**: 2024.11 ~ 진행 중
- **프로젝트 유형**: 개인 프로젝트
- **기획 배경**: 주식투자에 자부심이 있는 친구들과 함꼐 자웅을 겨루기 위함 

<br/>

## 주요 기능

- Finhub.io와 Twelve Data API를 활용한 실제 주식 데이터 기반 투자
- 주식 상세 페이지에서 실시간 가격 추이 및 차트 확인 가능
- localStorage를 이용한 주식 심볼 검색 및 검색 기록 자동 저장
- Firebase를 기반으로 한 안전한 로그인/로그아웃 및 유저 프로필 관리 기능

<br/>

## 기술 스택

| 항목           | 적용 스택 |
|----------------|-----------|
| **Frontend**   | React, TypeScript, JavaScript |
| **Styling**    | Tailwind CSS |
| **State**      | TanStack Query, Context API |
| **Form**       | React Hook Form |
| **Auth & DB**  | Firebase (Authentication, Firestore) |
| **API**        | [Finhub](https://finnhub.io/), [Twelve Data](https://twelvedata.com) |

<br/>

## 향후 계획

- [ ] 모의계좌에서 실제처럼 주식 구매/판매 기능 만들기
- [ ] 유저의 자산, 잔고, 주식 보유 정보 페이지 만들기
- [ ] 랭킹, 채팅, 커뮤니티 기능 만들기
- [ ] 한글로 심볼 검색 가능하도록 만들기

<br/>

##  한계 및 아쉬운 점

- 무료 API의 데이터 호출 지연 및 정확도 문제
- API 호출 횟수 제한
- 주봉 이상의 데이터 미제공
- 주식거래 수수료 등 실제 거래 환경과의 차이

<br/>

## 실행 방법

```bash
git clone https://github.com/your-username/narak.git

cd narak

npm install

npm start
