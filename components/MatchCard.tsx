'use client'

import Image from 'next/image'

interface Match {
  name1: string
  name2: string
  img1: string
  img2: string
  time: string
  status: string
  channel: string
  mic: string
  dawri: string
  result: string
  servers: string
}

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
          {match.dawri}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image
              src={match.img1}
              alt={match.name1}
              fill
              className="object-contain rounded-full"
              unoptimized
            />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
            {match.name1}
          </h3>
        </div>

        <div className="mx-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {match.result}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {match.time}
          </div>
        </div>

        <div className="flex-1 text-center">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image
              src={match.img2}
              alt={match.name2}
              fill
              className="object-contain rounded-full"
              unoptimized
            />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
            {match.name2}
          </h3>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">الحالة:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {match.status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">القناة:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {match.channel}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">المعلق:</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {match.mic}
          </span>
        </div>
      </div>
    </div>
  )
}

