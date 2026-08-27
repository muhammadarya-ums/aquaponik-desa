import { NextResponse } from 'next/server'
import { adminFirestore } from '@/lib/firebase-admin'
import { parseReading, validateReading } from '@/lib/telemetry'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const error = validateReading(payload)
    if (error) return NextResponse.json({ error }, { status: 400 })
    if (!adminFirestore) return NextResponse.json({ error: 'Firebase Admin is not configured' }, { status: 503 })
    const reading = parseReading(payload)
    await adminFirestore.collection('sensor_logs').add({ ...reading, siteId: payload.siteId })
    await adminFirestore.collection('sites').doc(payload.siteId).set({ ...reading, updatedAt: new Date() }, { merge: true })
    return NextResponse.json({ ok: true, siteId: payload.siteId, reading })
  } catch { return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 }) }
}
