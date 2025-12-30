'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { Moon, Sun, Home } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              href="/"
              className="flex items-center space-x-2 space-x-reverse text-xl font-bold text-primary-600 dark:text-primary-400"
            >
              <Home className="w-6 h-6" />
              <span>Ahmed Site</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link
              href="/matches"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/matches'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              المباريات اليوم
            </Link>
            <Link
              href="/channels"
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                pathname === '/channels'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              القنوات
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

