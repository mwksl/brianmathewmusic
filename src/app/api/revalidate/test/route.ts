import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      `/api/revalidate?path=/&secret=${process.env.REVALIDATE_SECRET}`,
      { method: 'POST' }
    )
    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
} 