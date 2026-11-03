# GL Build Studio UI — 회계 데스크톱 앱 UI 시안

회계(총계정원장) 데이터 처리 프로그램을 위한 **Electron + React + Tailwind v4 + shadcn/ui** 기반 UI 껍데기 시안입니다.
기능은 없고(목업 데이터), **디자인 시스템과 화면 구조**를 제공합니다. 기존 프로그램의 UI를 이 형식으로 이식하는 것이 목적입니다.

> 🤖 **Claude / AI 에이전트라면 [`MIGRATION.md`](./MIGRATION.md)를 먼저 읽으세요.**

## 특징
- 대량 정보 조회용 **컴팩트 밀도**: 본문 13px, 표 12.5px, 행 높이 28px, 컨트롤 높이 28px (작지만 읽히는 선)
- **라이트 / 다크 / 시스템** 테마 (OS 창 크롬과도 동기화)
- 금액·코드 컬럼 tabular-nums 우측 정렬, 차변/대변·상태(정상/주의/심각) 시맨틱 색상
- 화면: 상단바 · 좌측 진행단계 · 탭 · 툴바 · 점검 표 · 전표 그리드 · 상태바

## 실행
```bash
npm install
npm run dev      # Electron 개발 모드
npm run build    # 프로덕션 번들
npm run typecheck
```

## 구조
```
src/main/index.ts          Electron 메인 (창, 테마 IPC)
src/preload/index.ts       contextBridge (window.app.setTheme)
src/renderer/src/
  index.css                ★ 디자인 토큰 (색·폰트·밀도) — 여기만 고치면 전체 테마 변경
  App.tsx                  화면 레이아웃 시안
  data.ts                  목업 데이터
  components/ui/           shadcn 스타일 컴포넌트 (Button, Input, Badge, Kbd)
  hooks/use-theme.ts       테마 훅
```
