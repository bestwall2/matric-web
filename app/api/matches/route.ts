import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TOKEN = 'EAAKXMxkBFCIBQSVAYFyTAIQgnukpnQdy5PwiKg5ze4SO3P1sfxM48BnPOZBZAdLHxnCqdnlDaldHXU0AWhFJQ4rAGFHB4uK4yZC8kHr9f6wzHCgGZAGzBDQaAfmAuMZBL715utLfQNRP9D6L5pNcQxOx8905DbT5ZCEzzE9SVyuNkZBmJsOhKvSSfhx5MVCzmHLKboZD'
const POST_ID = '100985439354836_841729738620283'
const DATA_FILE = path.join(process.cwd(), 'data', 'matches.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

export async function GET() {
  try {
    // Try to fetch from Facebook API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${POST_ID}?fields=message&access_token=${TOKEN}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Facebook API')
    }

    const data = await response.json()
    let matches = []

    // Parse the message to extract JSON
    if (data.message) {
      try {
        // Try to extract JSON from the message
        const jsonMatch = data.message.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          matches = JSON.parse(jsonMatch[0])
        }
      } catch (parseError) {
        console.error('Error parsing message:', parseError)
      }
    }

    // Load saved edits if file exists
    ensureDataDir()
    if (fs.existsSync(DATA_FILE)) {
      try {
        const savedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        // Merge saved edits with fetched data
        matches = savedData
      } catch (error) {
        console.error('Error reading saved data:', error)
      }
    }

    return NextResponse.json({ matches })
  } catch (error) {
    // If API fails, try to load from saved file
    ensureDataDir()
    if (fs.existsSync(DATA_FILE)) {
      try {
        const savedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        return NextResponse.json({ matches: savedData })
      } catch (error) {
        console.error('Error reading saved data:', error)
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch matches', matches: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { matches } = await request.json()
    
    ensureDataDir()
    fs.writeFileSync(DATA_FILE, JSON.stringify(matches, null, 2), 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save matches' },
      { status: 500 }
    )
  }
}

