type WebVitalMetric = {
  id: string
  name: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'INP' | 'TTFB'
  value: number
  delta: number
  rating?: 'good' | 'needs-improvement' | 'poor'
  navigationType?: string
  entries?: PerformanceEntry[]
  timestamp: number
}

const metrics: WebVitalMetric[] = [] 

export async function POST(req: Request) {
  const metric = await req.json()
  console.log('Received metric:', metric)

  metrics.push({
    ...metric,
    timestamp: Date.now(),
  })

  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
  })
}

export async function GET() {
  return new Response(JSON.stringify(metrics), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
