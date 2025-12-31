import Link from 'next/link'
import { Calendar, Tv } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          مرحباً بك
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          اختر الصفحة التي تريد زيارتها
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href="/matches"
            className="group relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Calendar className="w-16 h-16 text-white mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-white mb-2">المباريات اليوم</h2>
            <p className="text-primary-100">عرض جميع المباريات المقررة اليوم</p>
          </Link>

          <Link
            href="/channels"
            className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <Tv className="w-16 h-16 text-white mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-white mb-2">القنوات</h2>
            <p className="text-purple-100">استمتع بمشاهدة القنوات المباشرة</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

