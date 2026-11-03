import { useState } from 'react'
import {
  AlertTriangle, BarChart3, CheckCircle2, ChevronDown, Circle, Database, FileText, FolderOpen,
  History, ListChecks, Monitor, Moon, Play, Plus, RefreshCw, Search, Sun, Table2, Square
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import { useTheme, type ThemeMode } from '@/hooks/use-theme'
import { checks, entries, steps, type Severity, type StepState } from '@/data'

const tabs = [
  { id: 'log', label: '실행 로그', icon: FileText },
  { id: 'map', label: '매핑 검수', icon: Table2 },
  { id: 'verify', label: '검증', icon: ListChecks },
  { id: 'data', label: '자료 현황', icon: Database },
  { id: 'history', label: '진행 이력', icon: History }
]

const fmt = (n: number) => (n ? n.toLocaleString('ko-KR') : '')

function StepIcon({ s }: { s: StepState }) {
  if (s === 'done') return <CheckCircle2 className="size-3.5 text-ok" />
  if (s === 'warn') return <AlertTriangle className="size-3.5 text-warn" />
  if (s === 'active') return <Play className="size-3.5 fill-primary text-primary" />
  return <Circle className="size-3.5 text-muted-foreground/60" />
}

function SevIcon({ s }: { s: Severity }) {
  return s === 'ok' ? <CheckCircle2 className="size-3.5 text-ok" /> : <AlertTriangle className="size-3.5 text-warn" />
}

function ThemeToggle({ mode, setMode }: { mode: ThemeMode; setMode: (m: ThemeMode) => void }) {
  const opts: { m: ThemeMode; icon: typeof Sun; title: string }[] = [
    { m: 'light', icon: Sun, title: '라이트' },
    { m: 'dark', icon: Moon, title: '다크' },
    { m: 'system', icon: Monitor, title: '시스템' }
  ]
  return (
    <div className="flex h-7 items-center rounded-md border border-input bg-card p-0.5">
      {opts.map(({ m, icon: Icon, title }) => (
        <button
          key={m}
          title={title}
          onClick={() => setMode(m)}
          className={cn(
            'grid size-6 place-items-center rounded-sm text-muted-foreground hover:text-foreground',
            mode === m && 'bg-accent text-foreground'
          )}
        >
          <Icon className="size-3.5" />
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const { mode, setMode } = useTheme()
  const [tab, setTab] = useState('verify')
  const [selCheck, setSelCheck] = useState(2)
  const [selRow, setSelRow] = useState<string | null>(entries[3].no)
  const sel = checks.find((c) => c.id === selCheck)!

  return (
    <div className="flex h-screen flex-col">
      {/* 상단 바 */}
      <header className="flex h-11 shrink-0 items-center gap-2 border-b bg-card px-3">
        <div className="mr-2 flex items-center gap-2">
          <div className="grid size-5 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground">GL</div>
          <span className="text-[13px] font-semibold">GL Build Studio</span>
          <span className="text-xs text-muted-foreground">v1.0 · 총계정원장 구축</span>
        </div>
        <div className="mx-1 h-5 w-px bg-border" />
        <span className="text-xs text-muted-foreground">Engagement</span>
        <Button variant="outline" className="w-44 justify-between font-normal">
          비앤지_2026 <ChevronDown className="opacity-60" />
        </Button>
        <Button variant="outline"><Plus />새로 만들기</Button>
        <Button variant="outline"><FolderOpen />폴더 열기</Button>
        <Button variant="ghost"><RefreshCw />상태 갱신</Button>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span>파일 <b className="num text-foreground">27</b></span>
          <span>적재 <b className="num text-foreground">27,913,846</b>행 / 원본 <b className="num text-foreground">27,913,825</b>행</span>
          <span>DB <b className="num text-foreground">2.1GB</b></span>
          <Badge variant="ok"><CheckCircle2 className="size-3" />전체적재</Badge>
          <ThemeToggle mode={mode} setMode={setMode} />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* 좌측: 진행 단계 */}
        <aside className="flex w-72 shrink-0 flex-col border-r bg-sidebar">
          <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">진행 단계</div>
          <ol className="min-h-0 flex-1 overflow-y-auto px-1.5">
            {steps.map((s) => (
              <li
                key={s.n}
                className={cn(
                  'flex h-8 cursor-default items-center gap-2 rounded-md px-1.5 hover:bg-accent',
                  s.state === 'active' && 'bg-accent'
                )}
              >
                <StepIcon s={s.state} />
                <span className="w-3 text-center text-xs text-muted-foreground">{s.n}</span>
                <span className="shrink-0 whitespace-nowrap text-sm font-medium">{s.name}</span>
                <span className="ml-auto min-w-0 truncate text-xs text-muted-foreground">{s.note}</span>
              </li>
            ))}
          </ol>
          <div className="border-t p-3">
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">다음 단계</div>
            <div className="mb-2 text-sm font-medium text-primary">검색앱 실행</div>
            <Button className="w-full"><Play className="fill-current" />검색앱 실행</Button>
            <Button variant="secondary" className="mt-1.5 w-full"><Square className="fill-current" />중단</Button>
            <div className="mb-1 mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">개별 실행</div>
            <div className="grid grid-cols-2 gap-1">
              {['사전점검', '정밀진단', '복구', 'XLSX변환', '구조스캔', '시험적재'].map((l) => (
                <Button key={l} variant="outline" size="sm">{l}</Button>
              ))}
            </div>
          </div>
        </aside>

        {/* 메인 */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* 탭 */}
          <nav className="flex h-9 shrink-0 items-end gap-0.5 border-b bg-card px-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  'flex h-8 items-center gap-1.5 border-b-2 border-transparent px-3 text-sm text-muted-foreground hover:text-foreground',
                  tab === id && 'border-primary font-medium text-foreground'
                )}
              >
                <Icon className="size-3.5" />{label}
              </button>
            ))}
          </nav>

          {/* 툴바 */}
          <div className="flex h-10 shrink-0 items-center gap-2 border-b px-3">
            <Button><Play className="fill-current" />검증 실행</Button>
            <div className="mx-1 h-5 w-px bg-border" />
            <Badge variant="danger" className="h-5 px-2 text-sm"><Circle className="size-2.5 fill-current" />심각 0</Badge>
            <Badge variant="warn" className="h-5 px-2 text-sm"><AlertTriangle className="size-3" />주의 3</Badge>
            <Badge variant="ok" className="h-5 px-2 text-sm"><CheckCircle2 className="size-3" />정상 5</Badge>
            <div className="ml-auto flex items-center gap-1.5">
              <Button variant="outline">대차차이 분석</Button>
              <Button variant="outline">SAP 점검</Button>
              <Button variant="outline"><BarChart3 />상세 리포트</Button>
            </div>
          </div>

          {/* 점검 항목 표 */}
          <section className="min-h-0 flex-[0_0_auto] border-b" style={{ height: 268 }}>
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-muted text-left text-xs text-muted-foreground">
                <tr>
                  <th className="h-7 w-8 border-b px-2 font-medium" />
                  <th className="h-7 w-44 border-b px-2 font-medium">점검 항목</th>
                  <th className="h-7 border-b px-2 font-medium">결과</th>
                </tr>
              </thead>
              <tbody>
                {checks.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelCheck(c.id)}
                    className={cn(
                      'h-7 cursor-default hover:bg-row-hover',
                      c.sev === 'warn' && 'bg-warn-bg/40',
                      selCheck === c.id && 'bg-row-selected hover:bg-row-selected'
                    )}
                  >
                    <td className="border-b px-2"><SevIcon s={c.sev} /></td>
                    <td className="border-b px-2"><span className="mr-1.5 text-muted-foreground">{c.id}</span>{c.name}</td>
                    <td className="border-b px-2 num">{c.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 상세 + 전표 그리드 */}
          <section className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-8 shrink-0 items-center gap-2 border-b bg-card px-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">상세 · 조치</span>
              <span className="text-sm">{sel.name}</span>
              {sel.note && <span className="truncate text-xs text-warn">※ {sel.note}</span>}
              <div className="relative ml-auto w-56">
                <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-7" placeholder="전표번호 · 계정 · 거래처 검색" />
              </div>
              <Kbd>Ctrl</Kbd><Kbd>K</Kbd>
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-muted text-xs text-muted-foreground">
                  <tr>
                    {['전표번호', '전표일자', '계정코드', '계정과목', '거래처', '적요'].map((h) => (
                      <th key={h} className="h-7 whitespace-nowrap border-b px-2 text-left font-medium">{h}</th>
                    ))}
                    <th className="h-7 border-b px-2 text-right font-medium">차변</th>
                    <th className="h-7 border-b px-2 text-right font-medium">대변</th>
                    <th className="h-7 w-16 border-b px-2 text-left font-medium">플래그</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e, i) => (
                    <tr
                      key={e.no}
                      onClick={() => setSelRow(e.no)}
                      className={cn(
                        'h-7 cursor-default hover:bg-row-hover',
                        i % 2 === 1 && 'bg-row-alt',
                        selRow === e.no && 'bg-row-selected hover:bg-row-selected'
                      )}
                    >
                      <td className="num whitespace-nowrap border-b px-2 font-mono text-xs">{e.no}</td>
                      <td className="num whitespace-nowrap border-b px-2">{e.date}</td>
                      <td className="num border-b px-2 font-mono text-xs text-muted-foreground">{e.code}</td>
                      <td className="whitespace-nowrap border-b px-2">{e.name}</td>
                      <td className="whitespace-nowrap border-b px-2">{e.partner}</td>
                      <td className="max-w-64 truncate border-b px-2 text-muted-foreground">{e.memo}</td>
                      <td className="num border-b px-2 text-right text-debit">{fmt(e.debit)}</td>
                      <td className="num border-b px-2 text-right text-credit">{fmt(e.credit)}</td>
                      <td className="border-b px-2">
                        {e.flag === 'dup' && <Badge variant="warn">중복</Badge>}
                        {e.flag === 'neg' && <Badge variant="danger">음수</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* 상태 바 */}
      <footer className="flex h-6 shrink-0 items-center gap-4 border-t bg-card px-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-ok" />준비됨</span>
        <span>선택 1행</span>
        <span>표시 {entries.length} / 27,913,846행</span>
        <span className="ml-auto">UTF-8 · KRW</span>
      </footer>
    </div>
  )
}
