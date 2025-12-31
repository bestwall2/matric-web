import type { Metadata } from 'next'
import { Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { DarkModeProvider } from '@/contexts/DarkModeContext'
import Navigation from '@/components/Navigation'

const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-arabic'
})

export const metadata: Metadata = {
  title: 'Matric - المباريات والقنوات',
  description: 'Live sports matches and channels streaming platform - منصة بث المباريات والقنوات المباشرة',
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
    siteName: 'Matric',
    title: 'Matric - المباريات والقنوات',
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
  viewportFit: 'cover' as const,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={notoSansArabic.className}>
        <DarkModeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </DarkModeProvider>
      </body>
    </html>
  )
}

