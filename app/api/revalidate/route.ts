

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  const path = req.nextUrl.searchParams.get('path')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ revalidated: false, message: 'Missing path' }, { status: 400 })
  }

  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, now: Date.now(), path })
  } catch (err) {
    return NextResponse.json({ revalidated: false, error: err }, { status: 500 })
  }
}
