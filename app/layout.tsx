import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'
import ClientLayout from './ClientLayout'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Ahmed Sports - المباريات والقنوات',
  description:
    'Live sports matches and channels streaming platform - منصة بث المباريات والقنوات المباشرة',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ahmed Sports',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Ahmed Sports',
    title: 'Ahmed Sports - المباريات والقنوات',
    description: 'Live sports matches and channels streaming platform',
  },
  twitter: {
    card: 'summary',
    title: 'Ahmed Sports',
    description: 'Live sports matches and channels streaming platform',
  },
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={tajawal.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
