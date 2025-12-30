'use client'

import { DarkModeProvider } from '@/contexts/DarkModeContext'
import Navigation from '@/components/Navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </DarkModeProvider>
  )
}
