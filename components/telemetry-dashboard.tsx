'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  BatteryCharging,
  Download,
  Gauge,
  MapPin,
  Radio,
  Sun,
  Thermometer,
  Waves,
  Zap,
} from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { getMockSite, MOCK_SITES, toCsv, type Site } from '@/lib/telemetry'

const mono = 'font-mono tabular-nums font-bold'

function Status({ active = true }: { active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-black tracking-wide ${
        active
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          : 'bg-rose-100 text-rose-800 border border-rose-300'
      }`}
    >
      <span
        className={`size-2.5 rounded-full ${
          active ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'
        }`}
      />
      {active ? 'ONLINE (BERJALAN)' : 'OFFLINE (TERPUTUS)'}
    </span>
  )
}

function Metric({
  label,
  value,
  unit,
  icon: Icon,
  tone = 'default',
}: {
  label: string
  value: string | number
  unit: string
  icon: typeof Zap
  tone?: 'default' | 'water' | 'amber'
}) {
  const toneStyles = {
    default: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    water: 'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }

  const badgeStyles = {
    default: 'text-emerald-800 bg-emerald-100 border border-emerald-200',
    water: 'text-sky-800 bg-sky-100 border border-sky-200',
    amber: 'text-amber-900 bg-amber-100 border border-amber-200',
  }

  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`grid size-10 place-items-center rounded-2xl border ${toneStyles[tone]}`}>
            <Icon className="size-5" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-600">
            {label}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`text-3xl sm:text-4xl font-black text-slate-900 tracking-tight ${mono}`}>
          {value}
        </span>
        <span className={`rounded-lg px-2.5 py-1 text-xs font-extrabold ${badgeStyles[tone]}`}>
          {unit}
        </span>
      </div>
    </div>
  )
}

function Tank({ level }: { level: number }) {
  const percentage = Math.min(100, Math.max(0, level))
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-blue-50 p-6">
      {/* Visual Tangki */}
      <div className="relative h-48 w-24 overflow-hidden rounded-2xl border-4 border-slate-800 bg-slate-900 shadow-inner shrink-0">
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sky-600 to-cyan-400 transition-all duration-500 ease-out"
          style={{ height: `${percentage}%` }}
        >
          <div className="absolute inset-x-0 top-0 h-2 bg-white/40 animate-pulse" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
          <span className={`text-2xl font-black ${mono}`}>{level}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">cm</span>
        </div>
      </div>

      {/* Detail Ketinggian Air */}
      <div className="space-y-3 text-center sm:text-left flex-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold text-sky-900 border border-sky-200">
          <Waves className="size-4 text-sky-600" />
          <span>Sensor Ultrasonik Air</span>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kapasitas Maksimal</p>
          <p className="text-lg font-black text-slate-900">100 cm</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Persentase Air Terisi</p>
          <p className={`text-3xl font-black text-sky-700 ${mono}`}>{Math.round(percentage)}%</p>
        </div>
      </div>
    </div>
  )
}

function SiteCard({ site }: { site: Site }) {
  return (
    <Link
      href={`/dashboard/${site.id}`}
      className="group block rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-lg bg-green-100 px-2.5 py-1 text-[11px] font-black tracking-widest text-green-800 uppercase mb-2">
            NODE {site.id.toUpperCase()}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-green-700 transition-colors">
            {site.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-500">
            <MapPin className="size-4 text-green-600" />
            {site.location}
          </p>
        </div>
        <Status />
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-3">
        <div className="rounded-xl bg-white p-3 border border-slate-100">
          <p className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">Daya Baterai</p>
          <p className={`mt-1 text-2xl font-black text-emerald-700 ${mono}`}>
            {site.latest.batteryPercent}<span className="text-sm font-bold">%</span>
          </p>
        </div>
        <div className="rounded-xl bg-white p-3 border border-slate-100">
          <p className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">Ketinggian Air</p>
          <p className={`mt-1 text-2xl font-black text-sky-700 ${mono}`}>
            {site.latest.waterLevelCm}<span className="text-sm font-bold"> cm</span>
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs font-extrabold text-slate-500">
        <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-700 border border-slate-200">
          Update: {site.latest.timestamp.slice(11, 16)} WIB
        </span>
        <span className="inline-flex items-center gap-1 text-green-700 transition-transform group-hover:translate-x-1 font-black">
          Buka Detail Telemetri →
        </span>
      </div>
    </Link>
  )
}

export function DashboardHome() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-green-600 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-md shadow-green-600/30">
              <Radio className="size-6" />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight text-emerald-950">
                BLUE SAVANT TELEMETRI
              </span>
              <span className="block text-xs font-bold text-green-700">
                Pemantauan Real-Time Aquaponik Desa
              </span>
            </div>
          </Link>
          <Status />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-10 flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-br from-green-500 via-emerald-700 to-emerald-900 p-8 text-white shadow-xl">
          <div>
            <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold tracking-widest text-amber-300 uppercase mb-3 border border-white/20">
              JARINGAN SENSOR DESA SEKARPUTIH
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Telemetri Aquaponik Desa
            </h1>
          </div>
          <p className="max-w-xl text-base font-medium text-green-50 leading-relaxed">
            Pantau kondisi keasaman air, tingkat ketinggian tangki, daya panel surya, dan baterai aki sistem aquaponik secara otomatis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {MOCK_SITES.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </section>
    </main>
  )
}

export function DetailDashboard({ siteId }: { siteId: string }) {
  const [site, setSite] = useState(getMockSite(siteId))
  const powerData = useMemo(
    () =>
      site.history.map((r) => ({
        time: r.timestamp,
        power: Number((r.solarVoltage * r.solarCurrent).toFixed(1)),
      })),
    [site]
  )
  const reading = site.latest
  const safePh = reading.ph >= 6.5 && reading.ph <= 7.5

  function exportCsv() {
    const blob = new Blob([toCsv(site)], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${site.id}-telemetry.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-green-600 shadow-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              aria-label="Kembali ke dashboard"
              className="grid size-11 place-items-center rounded-2xl border-2 border-slate-200 bg-slate-100 text-slate-700 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <span className="block text-[11px] font-black tracking-widest text-green-700 uppercase">
                LOKASI SENSOR (NODE)
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {site.name}
              </h1>
            </div>
            <div className="hidden sm:block">
              <Status />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={site.id}
              onChange={(e) => setSite(getMockSite(e.target.value))}
              className="h-11 rounded-xl border-2 border-slate-200 bg-white px-4 text-xs font-bold text-slate-800 outline-none focus:border-green-600 transition-all cursor-pointer shadow-sm"
            >
              <option value="site-a">LOKASI A / DESA SEKARPUTIH</option>
              <option value="site-b">LOKASI B / DESA MITRA</option>
            </select>
            <button
              onClick={exportCsv}
              className="flex h-11 items-center gap-2 rounded-xl bg-green-600 px-4 text-xs font-extrabold text-white hover:bg-green-700 transition-all shadow-md shadow-green-600/20 active:scale-95"
            >
              <Download className="size-4" /> UNDUH CSV
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 space-y-8">
        {/* Metric Grid Utama */}
        <div>
          <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-3">
            1. Telemetri Daya Surya & Baterai Aki
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Metric label="Tegangan Panel" value={reading.solarVoltage} unit="Volt" icon={Sun} tone="amber" />
            <Metric label="Arus Listrik" value={reading.solarCurrent} unit="Ampere" icon={Zap} tone="amber" />
            <Metric label="Daya Listrik" value={(reading.solarVoltage * reading.solarCurrent).toFixed(1)} unit="Watt" icon={Gauge} tone="amber" />
            <Metric label="Kapasitas Baterai" value={reading.batteryPercent} unit="%" icon={BatteryCharging} tone="default" />
          </div>
        </div>

        {/* Grid Grafik & Tangki Water */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Grafik Daya */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-black tracking-widest text-amber-600 uppercase">
                  ENERGI MANDIRI
                </span>
                <h2 className="mt-1 text-xl font-black text-slate-900">
                  Grafik Produksi Daya Listrik
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">
                6 Jam Terakhir
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={powerData}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} tickLine={false} axisLine={false} unit="W" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', color: '#0f172a' }} />
                  <Line type="monotone" dataKey="power" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tangki Air */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-xs font-black tracking-widest text-sky-600 uppercase">
                SISTEM AIR KOLAM
              </span>
              <h2 className="mt-1 text-xl font-black text-slate-900">
                Level Ketinggian Tangki Air
              </h2>
            </div>
            <Tank level={reading.waterLevelCm} />
          </div>
        </div>

        {/* Metric Kualitas Air */}
        <div>
          <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-3">
            2. Kualitas Air & Lingkungan Kolam
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Metric
              label="Keasaman Air (pH)"
              value={reading.ph}
              unit={safePh ? 'AMAN (6.5 - 7.5)' : 'PERHATIAN'}
              icon={Activity}
              tone={safePh ? 'water' : 'amber'}
            />
            <Metric label="Suhu Air Kolam" value={reading.temperature} unit="°C" icon={Thermometer} tone="water" />
            <Metric label="Status Jaringan" value="LANCAR" unit="REAL-TIME" icon={Waves} tone="default" />
          </div>
        </div>
      </section>
    </main>
  )
}