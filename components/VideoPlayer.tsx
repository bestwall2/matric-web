'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Loader2 } from 'lucide-react'

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

export default function VideoPlayer({
  channel,
  onClose,
}: {
  channel: Channel
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    if (!videoRef.current || !channel.dash_url) return

    const initPlayer = async () => {
      try {
        setLoading(true)
        setError(null)

        if (typeof window !== 'undefined' && videoRef.current) {
          // Try using dash.js for MPD support
          try {
            // Use Function constructor to avoid Next.js build-time analysis
            const importDashjs = new Function('return import("dashjs")')
            const dashjs = await importDashjs()
            const player = dashjs.MediaPlayer().create()
            playerRef.current = player
            
            player.initialize(videoRef.current, channel.dash_url, true)
            player.updateSettings({
              streaming: {
                bufferingGoal: 30,
                rebufferingGoal: 2,
                bufferBehind: 30,
              },
            })
            
            setLoading(false)
          } catch (dashError) {
            // Fallback: try shaka-player
            try {
              const importShaka = new Function('return import("shaka-player")')
              const shaka = await importShaka()
              
              if (shaka.polyfill && shaka.polyfill.installAll) {
                shaka.polyfill.installAll()
              }

              if (shaka.Player && shaka.Player.isBrowserSupported()) {
                const player = new shaka.Player(videoRef.current)
                playerRef.current = player

                player.configure({
                  streaming: {
                    bufferingGoal: 30,
                    rebufferingGoal: 2,
                    bufferBehind: 30,
                  },
                })

                await player.load(channel.dash_url)
                setLoading(false)
              } else {
                throw new Error('المتصفح غير مدعوم')
              }
            } catch (shakaError) {
              // Final fallback: try direct URL (may not work for MPD)
              console.warn('MPD players failed, trying direct URL:', shakaError)
              videoRef.current.src = channel.dash_url
              videoRef.current.load()
              setLoading(false)
            }
          }
        }
      } catch (err: any) {
        console.error('Error loading video:', err)
        setError(err.message || 'فشل تحميل الفيديو')
        setLoading(false)
      }
    }

    initPlayer()

    return () => {
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.destroy === 'function') {
            playerRef.current.destroy()
          } else if (typeof playerRef.current.reset === 'function') {
            playerRef.current.reset()
          }
        } catch (e) {
          console.error('Error destroying player:', e)
        }
      }
    }
  }, [channel.dash_url])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{channel.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            playsInline
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
                <p className="text-white">جاري تحميل الفيديو...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="text-center p-6">
                <p className="text-red-400 text-lg mb-4">{error}</p>
                <p className="text-gray-400 text-sm">
                  رابط الفيديو: {channel.dash_url.substring(0, 50)}...
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-800 text-sm text-gray-400">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">الحالة:</span>{' '}
              <span className={channel.active ? 'text-green-400' : 'text-red-400'}>
                {channel.active ? 'مباشر' : 'غير متاح'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">آخر تحديث:</span>{' '}
              <span>{new Date(channel.last_update).toLocaleString('ar-EG')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

