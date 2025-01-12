import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const payload = await getPayload({
      config: configPromise,
    })

    const body = await req.json()
    
    const form = await payload.create({
      collection: 'forms',
      data: {
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    })

    return NextResponse.json({ success: true, data: form })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
