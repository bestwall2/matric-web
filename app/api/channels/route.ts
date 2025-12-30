import { NextRequest, NextResponse } from 'next/server'

const TOKEN = 'EAAKXMxkBFCIBQSVAYFyTAIQgnukpnQdy5PwiKg5ze4SO3P1sfxM48BnPOZBZAdLHxnCqdnlDaldHXU0AWhFJQ4rAGFHB4uK4yZC8kHr9f6wzHCgGZAGzBDQaAfmAuMZBL715utLfQNRP9D6L5pNcQxOx8905DbT5ZCEzzE9SVyuNkZBmJsOhKvSSfhx5MVCzmHLKboZD'
const POST_ID = '100985439354836_841453868647870'

export async function GET() {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${POST_ID}?fields=message&access_token=${TOKEN}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from Facebook API')
    }

    const data = await response.json()
    let channels = []

    // Parse the message to extract JSON
    if (data.message) {
      try {
        // Try to extract JSON from the message
        const jsonMatch = data.message.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          channels = JSON.parse(jsonMatch[0])
        }
      } catch (parseError) {
        console.error('Error parsing message:', parseError)
      }
    }

    return NextResponse.json({ channels })
  } catch (error) {
    console.error('Error fetching channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch channels', channels: [] },
      { status: 500 }
    )
  }
}

