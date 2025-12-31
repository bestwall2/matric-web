import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * ⚠️ TOKEN as string (as requested)
 * ⚠️ Consider env vars later for security
 */
const TOKEN =
  'EAAKXMxkBFCIBQSVAYFyTAIQgnukpnQdy5PwiKg5ze4SO3P1sfxM48BnPOZBZAdLHxnCqdnlDaldHXU0AWhFJQ4rAGFHB4uK4yZC8kHr9f6wzHCgGZAGzBDQaAfmAuMZBL715utLfQNRP9D6L5pNcQxOx8905DbT5ZCEzzE9SVyuNkZBmJsOhKvSSfhx5MVCzmHLKboZD'

const POST_ID = '100985439354836_841729738620283'

/**
 * GET /api/matches
 */
export async function GET() {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${POST_ID}?fields=message&access_token=${TOKEN}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Facebook API request failed')
    }

    const data = await response.json()
    let matches: any[] = []

    /**
     * Extract JSON array from post message
     */
    if (typeof data.message === 'string') {
      const jsonMatch = data.message.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        matches = JSON.parse(jsonMatch[0])
      }
    }

    return NextResponse.json({ matches })
  } catch (error) {
    console.error('GET /api/matches error:', error)

    return NextResponse.json(
      { error: 'Failed to fetch matches', matches: [] },
      { status: 500 }
    )
  }
}

/**
 * POST /api/matches
 * (No persistence – just validation echo)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!Array.isArray(body.matches)) {
      return NextResponse.json(
        { error: 'Invalid matches format' },
        { status: 400 }
      )
    }

    /**
     * No saving – just return success
     */
    return NextResponse.json({
      success: true,
      matches: body.matches,
    })
  } catch (error) {
    console.error('POST /api/matches error:', error)

    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 500 }
    )
  }
}
