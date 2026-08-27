import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  Cpu,
  Droplets,
  Leaf,
  Radio,
  ShieldCheck,
  Sun,
  Zap,
  Activity,
  BarChart3,
} from 'lucide-react'

export default function Page() {
  const logos = [
    { src: '/logos/tut-wuri.png', alt: 'Tut Wuri Handayani', className: 'w-8 h-8 md:w-10 md:h-10' },
    { src: '/logos/diktisaintek.png', alt: 'Diktisaintek', className: 'w-8 h-8 md:w-10 md:h-10' },
    { src: '/logos/belmawa.png', alt: 'Belmawa', className: 'w-20 h-7 md:w-24 md:h-8' },
    { src: '/logos/ppk-ormawa.png', alt: 'PPK Ormawa', className: 'w-8 h-8 md:w-10 md:h-10' },
    { src: '/logos/umsura.png', alt: 'Universitas Muhammadiyah Surabaya', className: 'w-20 h-7 md:w-24 md:h-8' },
    { src: '/logos/tim-ppko.png', alt: 'Tim PPKO', className: 'w-8 h-8 md:w-10 md:h-10' },
    { src: '/logos/imm-blue-savant.png', alt: 'IMM Blue Savant', className: 'w-8 h-8 md:w-10 md:h-10' },
  ]

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 antialiased font-sans">
      
      {/* HEADER & NAVIGASI */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-green-600 shadow-md">
  {/* Top Bar: Jajaran Logo Partnership */}
  <div className="bg-green-50 border-b border-green-100 py-2.5 px-4">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <span className="hidden lg:inline-block text-xs font-bold tracking-wide text-green-950 uppercase shrink-0">
        Mitra & Penyelenggara:
      </span>

      {/* Container Scroll Logo (Diperbaiki untuk Mobile) */}
      <div className="w-full lg:w-auto overflow-x-auto scrollbar-none py-1">
        <div className="flex items-center gap-6 sm:gap-8 min-w-max px-2">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`relative shrink-0 ${logo.className} transition-transform hover:scale-105`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="120px"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Main Navbar */}
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-lg shadow-green-600/30">
        <Leaf className="size-6" />
      </div>
      <div>
        <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950 leading-none">
          AQUAPONIK DESA
        </span>
        <span className="block text-xs font-bold tracking-wider text-green-800 mt-1">
          DESA SEKARPUTIH
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-green-100 px-3.5 py-1 text-xs font-bold text-green-900 border border-green-300">
        <span className="size-2.5 rounded-full bg-green-600 animate-pulse"></span>
        PPK ORMAWA 2026
      </span>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-xs font-extrabold text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30 active:scale-95"
      >
        DASHBOARD
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  </div>
</header>

      {/* HERO SECTION: Hijau Segar & Kontras Tinggi */}
      <section className="relative bg-gradient-to-br from-green-500 via-emerald-700 to-emerald-900 text-white py-14 md:py-20 px-4 sm:px-6 shadow-inner">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            
            {/* Teks Utama */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                Pertanian Modern & Sustainable untuk <span className="text-amber-300 decoration-amber-400 decoration-wavy decoration-2">Desa Sekarputih</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-green-50 max-w-2xl font-medium">
                Sistem budidaya ikan dan tanaman hemat air berbasis tenaga matahari mandiri serta dipantau otomatis secara real-time oleh <strong>PK IMM Blue Savant UM Surabaya</strong>.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-3 rounded-xl bg-amber-400 px-6 py-4 text-sm font-black text-emerald-950 transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/20 active:scale-95"
                >
                  MASUK DASHBOARD TELEMETRI
                  <ArrowUpRight className="size-5" />
                </Link>
                <a
                  href="#teknologi"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-4 text-sm font-bold text-white transition-all"
                >
                  Pelajari Teknologi
                </a>
              </div>
            </div>

            {/* Ringkasan Kartu Ringkas (Mudah Dibaca Orang Tua) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Activity className="size-5 text-green-600 animate-pulse" />
                    <span className="text-xs font-black tracking-wider text-slate-800 uppercase">STATUS SISTEM HARIAN</span>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 border border-green-300">
                    BERJALAN BAIK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-700 mb-1">
                      <Sun className="size-5" />
                      <span className="text-xs font-extrabold uppercase">Panel Surya</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900">550 WP</p>
                    <p className="text-[11px] font-bold text-amber-800 mt-1">Listrik Mandiri</p>
                  </div>

                  <div className="rounded-2xl bg-teal-50 border-2 border-teal-200 p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-teal-700 mb-1">
                      <Droplets className="size-5" />
                      <span className="text-xs font-extrabold uppercase">Hemat Air</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900">≥40%</p>
                    <p className="text-[11px] font-bold text-teal-800 mt-1">Lebih Irigasi Hemat</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-green-50 border-2 border-green-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-green-700" />
                    <div>
                      <p className="text-xs font-black text-slate-900">Kelompok Tani SuryaTani</p>
                      <p className="text-[11px] font-bold text-green-800">Desa Sekarputih, Gresik</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-green-700 bg-green-200/80 px-2.5 py-1 rounded-lg">100% AMAN</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEKSI 1: PENJELASAN SINGKAT & JELAS */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold tracking-widest text-green-700 uppercase bg-green-100 px-3 py-1 rounded-full border border-green-200">
              CARA KERJA SEDERHANA
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bagaimana Aquaponik Bekerja?
            </h2>
            <p className="mt-3 text-slate-600 text-base font-medium">
              Satu sistem terpadu untuk menghasilkan ikan segar dan sayuran hijau tanpa obat kimia berbahaya.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 sm:p-8 hover:border-green-400 transition-all shadow-sm">
              <div className="size-14 rounded-2xl bg-green-600 text-white grid place-items-center mb-6 shadow-md shadow-green-600/20">
                <Droplets className="size-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">1. Air Kolam Ikan</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Air dari kolam ikan kaya akan nutrisi alami yang sangat bagus untuk pertumbuhan tanaman pupuk organik.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 sm:p-8 hover:border-green-400 transition-all shadow-sm">
              <div className="size-14 rounded-2xl bg-green-600 text-white grid place-items-center mb-6 shadow-md shadow-green-600/20">
                <Leaf className="size-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">2. Diserap Sayuran</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Akar tanaman kangkung dan sayur menyerap nutrisi tersebut, sekaligus membersihkan air kolam secara alami.
              </p>
            </div>

            <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-6 sm:p-8 hover:border-green-400 transition-all shadow-sm">
              <div className="size-14 rounded-2xl bg-green-600 text-white grid place-items-center mb-6 shadow-md shadow-green-600/20">
                <BarChart3 className="size-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">3. Panen Berganda</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Warga desa bisa memanen ikan lele/nila dan sayuran segar hemat air dalam waktu yang bersamaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEKSI 2: TEKNOLOGI */}
      <section id="teknologi" className="py-16 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold tracking-widest text-green-400 uppercase bg-green-950 px-3 py-1 rounded-full border border-green-800">
              TEKNOLOGI TEPAT GUNA
            </span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black text-white tracking-tight">
              Tenaga Surya & Otomatisasi IoT
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-800/80 border-2 border-slate-700 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/20 text-amber-300 px-3 py-1 text-xs font-bold mb-4">
                <Sun className="size-4" /> Panel Surya Mandiri
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Listrik Gratis dari Matahari</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Menggunakan 2 Panel Surya 550 WP untuk menggerakkan pompa sirkulasi air 24 jam nonstop tanpa bergantung pada listrik PLN.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-800/80 border-2 border-slate-700 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-lg bg-teal-500/20 text-teal-300 px-3 py-1 text-xs font-bold mb-4">
                <Cpu className="size-4" /> Otomatisasi IoT
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Penyiraman & Sensor Otomatis</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Sensor membaca tingkat kelembapan air dan tanah secara otomatis, sehingga pompa menyiram tanaman sesuai kebutuhan tanpa perlu manual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-green-200 bg-white py-10 text-slate-600 text-xs font-medium">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div>
            <p className="font-extrabold text-slate-900 text-sm">PPK ORMAWA PK IMM BLUE SAVANT</p>
            <p className="mt-0.5 text-slate-600">Universitas Muhammadiyah Surabaya — Desa Sekarputih, Gresik</p>
          </div>
        </div>
      </footer>
    </main>
  )
}