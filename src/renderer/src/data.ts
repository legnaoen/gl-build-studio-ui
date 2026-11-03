// 시안용 목업 데이터 (원본 앱 스크린샷 기준)
export type StepState = 'done' | 'warn' | 'todo' | 'active'

export const steps: { n: string; name: string; note: string; state: StepState }[] = [
  { n: '①', name: '자료 투입', note: '27개 · 3.7GB', state: 'done' },
  { n: '②', name: '사전점검', note: '접수대장 생성됨', state: 'done' },
  { n: '③', name: '정밀진단', note: '구조·복구를 확인', state: 'done' },
  { n: '④', name: 'XLSX 변환', note: '엑셀 3개', state: 'done' },
  { n: '⑤', name: '구조스캔', note: '구조 2종', state: 'done' },
  { n: '⑥', name: '매핑검수', note: '승인 2/2', state: 'done' },
  { n: '⑦', name: '시험적재', note: '전체적재로 대체됨', state: 'done' },
  { n: '⑧', name: '전체적재', note: '27,913,846행 · 2.1GB', state: 'done' },
  { n: '⑨', name: '검증', note: '주의 3건', state: 'warn' },
  { n: '⑩', name: '사전학습', note: '선택 (다음 고객사 효율↑)', state: 'todo' },
  { n: '⑪', name: '검색', note: '실행 가능', state: 'active' }
]

export type Severity = 'ok' | 'warn' | 'danger'
export const checks: { id: number; name: string; result: string; note?: string; sev: Severity }[] = [
  { id: 1, name: '행수 대조', result: '27개 파일 모두 일치 (손실 0)', sev: 'ok' },
  { id: 2, name: '대차 일치', result: '차이 614,790원 (차변의 -0.0000%)', note: '음수전기 미반영 3행 · 차대구분 이상 23행(컬럼밀림)', sev: 'warn' },
  { id: 3, name: '컬럼 밀림 징후', result: '계정과목에 비정상 값 0건 (0.000%)', sev: 'ok' },
  { id: 4, name: '기간 커버리지', result: '2020~2024 · 60/60개월', sev: 'ok' },
  { id: 5, name: '파싱 거부행', result: '23건 (0.000%)', sev: 'warn' },
  { id: 6, name: '필수컬럼 결측', result: '전표일자 0.0% · 계정코드 0.0% · 금액0 0.321% · 적요 34.618%', sev: 'ok' },
  { id: 7, name: '원본 추적성', result: '파일 27개 · 행번호 이상 0건', sev: 'ok' },
  { id: 8, name: '완전중복 행', result: '76,304건', sev: 'warn' }
]

export const entries = Array.from({ length: 48 }, (_, i) => {
  const accounts = [
    ['10100', '현금'], ['10300', '보통예금'], ['10800', '외상매출금'], ['14600', '상품'],
    ['25100', '외상매입금'], ['40100', '상품매출'], ['45100', '매출원가'], ['82100', '복리후생비'],
    ['83100', '접대비'], ['81100', '급여']
  ]
  const [code, name] = accounts[(i * 7) % accounts.length]
  const amt = ((i * 7919) % 9000 + 120) * 1000 + (i % 3) * 370
  const debit = i % 2 === 0
  return {
    no: `2024${String(1000 + i * 3)}`,
    date: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i * 3) % 27 + 1).padStart(2, '0')}`,
    code, name,
    memo: ['3월분 급여 지급', '거래처 대금 입금', '사무용품 구입', '법인카드 결제', '재고 매입', ''][i % 6],
    partner: ['(주)한빛상사', '대성유통', '미래테크', '청우산업', ''][i % 5],
    debit: debit ? amt : 0,
    credit: debit ? 0 : amt,
    flag: (i % 11 === 3 ? 'dup' : i % 17 === 5 ? 'neg' : null) as 'dup' | 'neg' | null
  }
})
