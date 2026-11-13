import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload, ValidationError } from 'payload'
import { checkBotId } from 'botid/server'
import { CONTACT_LIMITS as LIMITS, HONEYPOT_FIELD } from '@/utilities/contactForm'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// BotID only works on Vercel. Elsewhere (local `next start`, Docker) the honeypot is the only check.
// Fail open on BotID errors: losing a real inquiry is worse than letting one spam message through.
async function isBotRequest() {
  if (!process.env.VERCEL) return false
  try {
    const { isBot } = await checkBotId()
    // An error body from the BotID API has no isBot; log it so a silently disabled check is visible.
    if (typeof isBot !== 'boolean') console.error('BotID returned no verdict, allowing request')
    return isBot === true
  } catch (error) {
    console.error('BotID check failed, allowing request:', error)
    return false
  }
}

export async function POST(req: Request) {
  try {
    if (await isBotRequest()) {
      return NextResponse.json({ success: false, error: "We couldn't verify your submission. Please try again." }, { status: 403 })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }

    // Honeypot: humans never see this field. Pretend success so bots don't adapt.
    if (body[HONEYPOT_FIELD]) {
      console.warn('Honeypot triggered, submission discarded')
      return NextResponse.json({ success: true })
    }

    const data = {} as Record<keyof typeof LIMITS, string>
    for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
      const value = typeof body[key] === 'string' ? body[key].trim() : ''
      if (!value) {
        return NextResponse.json(
          { success: false, error: `Please provide a valid ${key}` },
          { status: 400 },
        )
      }
      if (value.length > LIMITS[key]) {
        return NextResponse.json(
          { success: false, error: `Your ${key} is too long (max ${LIMITS[key]} characters)` },
          { status: 400 },
        )
      }
      data[key] = value
    }
    if (!EMAIL_RE.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    // Local API bypasses access control; public create is disabled on the collection.
    await payload.create({ collection: 'forms', data })

    return NextResponse.json({ success: true })
  } catch (error) {
    // Payload's email validator is stricter than EMAIL_RE (e.g. rejects "john.@gmail.com").
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: 'Please check your email address and try again' },
        { status: 400 },
      )
    }
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 },
    )
  }
}
