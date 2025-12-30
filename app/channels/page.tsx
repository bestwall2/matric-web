'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Play } from 'lucide-react'
import ChannelCard from '@/components/ChannelCard'
import VideoPlayer from '@/components/VideoPlayer'

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

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)

  const fetchChannels = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/channels')
      const data = await response.json()
      if (data.channels) {
        setChannels(data.channels)
      }
    } catch (error) {
      console.error('Error fetching channels:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChannels()
  }, [])

  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel)
  }

  const handleClosePlayer = () => {
    setSelectedChannel(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل القنوات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          القنوات المباشرة
        </h1>
        <button
          onClick={fetchChannels}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>تحديث</span>
        </button>
      </div>

      {channels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            لا توجد قنوات متاحة حالياً
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {channels.map((channel, index) => (
            <ChannelCard
              key={index}
              channel={channel}
              onClick={() => handleChannelClick(channel)}
            />
          ))}
        </div>
      )}

      {selectedChannel && (
        <VideoPlayer
          channel={selectedChannel}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  )
}

