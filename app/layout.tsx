import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google';
import './globals.css'
import { DarkModeProvider } from '@/contexts/DarkModeContext'
import Navigation from '@/components/Navigation'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Ahmed Sports - المباريات والقنوات',
  description: 'Live sports matches and channels streaming platform - منصة بث المباريات والقنوات المباشرة',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={tajawal.className}>
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

