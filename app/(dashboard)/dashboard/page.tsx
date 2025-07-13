import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Activity, Clock, Gauge } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { WebVitalsChart } from '@/components/dashboard/WebVitalsChart'

export const dynamic = 'force-dynamic'


type WebVital = {
  id: string
  name: 'LCP' | 'FID' | 'CLS'
  value: number
  timestamp: string
}

type ChartPoint = {
  name: string
  LCP?: number
  FID?: number
  CLS?: number
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const res = await fetch(`${baseUrl}/api/web-vitals`, {
    cache: 'no-store',
  })
  const vitals: WebVital[] = await res.json()

  const chartData: ChartPoint[] = vitals.reduce((acc: ChartPoint[], v) => {
    const timeLabel = new Date(v.timestamp).toLocaleTimeString()
    const existing = acc.find((item) => item.name === timeLabel)
    if (existing) {
      existing[v.name] = v.value
    } else {
      acc.push({ name: timeLabel, [v.name]: v.value })
    }
    return acc
  }, [])

  return (
    <main className="lg:px-32 md:px-16 px-5 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Performance Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Web Vitals Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <WebVitalsChart data={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Web Vitals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vitals.map((v) => {
              let Icon = Gauge
              if (v.name === "LCP") Icon = Clock
              else if (v.name === "FID") Icon = Activity
              else if (v.name === "CLS") Icon = Gauge

              return (
                <div
                  key={v.id}
                  className="flex flex-col border rounded-xl p-4 bg-background shadow-sm hover:shadow transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h4 className="text-base font-semibold">{v.name}</h4>
                  </div>
                  <div className="flex flex-col text-sm space-y-1">
                    <div>
                      <span className="text-muted-foreground">Value:</span>{" "}
                      <span className="font-medium">{v.value.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timestamp:</span>{" "}
                      <span className="text-xs">
                        {new Date(v.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
