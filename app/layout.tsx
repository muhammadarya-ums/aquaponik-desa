import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aquaponik Desa Sekarputih - Smart Farming & Energi Surya',
  description: 'Platform digital monitoring dan pemberdayaan sistem aquaponik berbasis energi surya dan IoT oleh Tim PPK Ormawa IMM Blue Savant',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Aquaponik Desa Sekarputih - Smart Farming Berbasis Energi Surya',
    description: 'Platform digital monitoring dan pemberdayaan sistem aquaponik berbasis energi surya dan IoT oleh Tim PPK Ormawa IMM Blue Savant',
    url: 'https://aquaponik-desa.vercel.app',
    siteName: 'Aquaponik Desa',
    images: [
      {
        url: 'https://aquaponik-desa.vercel.app/icon.png',
        width: 1200,
        height: 630,
        alt: 'Logo Aquaponik Desa',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquaponik Desa - Smart Farming & Energi Surya',
    description: 'Platform digital monitoring sistem aquaponik berbasis energi surya dan IoT',
    images: ['https://aquaponik-desa.vercel.app/icon.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#059669',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark bg-emerald-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}