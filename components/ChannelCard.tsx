'use client'

import { Play, Radio } from 'lucide-react'

interface Channel {
  name: string
  token: string
  live_id: string
  dash_url: string
  key_age_seconds: number
  uptime_seconds: number
  active: boolean
  status: string
  source: string
  last_update: string
}

export default function ChannelCard({
  channel,
  onClick,
}: {
  channel: Channel
  onClick: () => void
}) {
  const getStatusColor = (status: string, active: boolean) => {
    if (active) return 'bg-green-500'
    if (status === 'restarting') return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  const getStatusText = (status: string, active: boolean) => {
    if (active) return 'مباشر'
    if (status === 'restarting') return 'إعادة تشغيل'
    return 'غير متاح'
  }

  return (
    <div
      onClick={onClick}
      className="group relative bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {channel.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white text-center mb-4 line-clamp-2">
          {channel.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor(
                channel.status,
                channel.active
              )}`}
            ></div>
            <span className="text-sm text-purple-100">
              {getStatusText(channel.status, channel.active)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2 space-x-reverse bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Play className="w-5 h-5 text-white" />
            <span className="text-white font-medium">مشاهدة</span>
          </div>
        </div>
      </div>
    </div>
  )
}

