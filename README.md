# 404 Not Found
> **"단서를 찾아 탈출하라."** > 웹 브라우저에서 즐기는 인터랙티브 추리 방탈출 게임

---

## 프로젝트 개요
- **서비스 명**: 404 Not Found
- **타겟**: 비용과 장소의 제약 없이 방탈출을 즐기고 싶은 모든 유저
- **핵심 가치**: 높은 몰입감, 접근성, 지적 유희
- **개발 기간**: 2026.04 ~ 2026.06

## 주요 기능
- **Interactive Play**: 마우스 클릭 및 드래그를 활용한 실시간 오브젝트 조사
- **Inventory**: 획득한 아이템을 보관하고 조합하여 퍼즐 해결
- **Real-time Hint**: 단계별 실시간 힌트 시스템
- **Ranking**: 탈출 시간을 기록하고 다른 유저와 경쟁하는 명예의 전당

## 🛠 기술 스택
### Frontend
- **Framework**: React (JavaScript)
- **Router**: React Router Dom
- **Styling**: CSS

### Backend (Planned)
- **Framework**: Nest.js
- **Database**: MySQL

## 📂 폴더 구조
```text
src/
├── assets/       # 이미지 및 사운드 리소스
├── components/   # 재사용 가능한 UI 컴포넌트
├── constants/    # 게임 내 상수 (아이템, 퍼즐 정보)
├── hooks/        # 커스텀 훅 (타이머 등)
├── pages/        # 각 화면 (Home, Lobby, Game, Ending, Ranking)
├── services/     # API 호출 및 비즈니스 로직
├── store/        # Zustand 상태 관리 (게임 데이터, 인벤토리)
├── styles/       # 스타일 시트 (CSS Modules / Tailwind CSS)
└── utils/        # 유틸리티 함수 (타이머 등)