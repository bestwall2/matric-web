'use client'

import { useEffect, useState } from 'react'
import { Edit2, Trash2, RefreshCw, Save } from 'lucide-react'
import MatchCard from '@/components/MatchCard'
import MatchEditModal from '@/components/MatchEditModal'
export const dynamic = 'force-dynamic'

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

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editData, setEditData] = useState<Match | null>(null)
  const [saving, setSaving] = useState(false)
  const { darkMode } = useDarkMode()
  const fetchMatches = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/matches')
      const data = await response.json()
      if (data.matches) {
        setMatches(data.matches)
      }
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setEditData({ ...matches[index] })
  }

  const handleSave = async () => {
    if (editingIndex === null || !editData) return

    setSaving(true)
    const updatedMatches = [...matches]
    updatedMatches[editingIndex] = editData

    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matches: updatedMatches }),
      })

      if (response.ok) {
        setMatches(updatedMatches)
        setEditingIndex(null)
        setEditData(null)
      }
    } catch (error) {
      console.error('Error saving matches:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (index: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المباراة؟')) return

    const updatedMatches = matches.filter((_, i) => i !== index)

    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matches: updatedMatches }),
      })

      if (response.ok) {
        setMatches(updatedMatches)
      }
    } catch (error) {
      console.error('Error deleting match:', error)
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setEditData(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل المباريات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          مباريات اليوم
        </h1>
        <button
          onClick={fetchMatches}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>تحديث</span>
        </button>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            لا توجد مباريات متاحة حالياً
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <div key={index} className="relative">
              <MatchCard match={match} />
              <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                  title="تعديل"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingIndex !== null && editData && (
        <MatchEditModal
          match={editData}
          onSave={(updatedMatch) => {
            setEditData(updatedMatch)
            handleSave()
          }}
          onCancel={handleCancel}
          saving={saving}
        />
      )}
    </div>
  )
}

