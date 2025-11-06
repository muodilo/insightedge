/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'

interface Props {
  data: {
    name: string
    LCP?: number
    FID?: number
    CLS?: number
  }[]
}

export function WebVitalsChart({ data }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">
        Core Web Vitals Over Time
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Tracking LCP (Largest Contentful Paint), FID (First Input Delay),
        and CLS (Cumulative Layout Shift) over recent page visits.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: "Time", position: "insideBottomRight", offset: -5 }} />
          <YAxis
            label={{
              value: "Value",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value: any, name: string) => [
              Number(value).toFixed(2),
              name,
            ]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="LCP"
            name="LCP (s)"
            stroke="#4f46e5"
            fill="#c7d2fe"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="FID"
            name="FID (ms)"
            stroke="#16a34a"
            fill="#bbf7d0"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="CLS"
            name="CLS (score)"
            stroke="#dc2626"
            fill="#fecaca"
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>

      <p className="text-xs text-muted-foreground mt-2">
        LCP (Largest Contentful Paint): Good ≤ 2.5s.  
        FID (First Input Delay): Good ≤ 100ms.  
        CLS (Cumulative Layout Shift): Good ≤ 0.1.
      </p>
    </div>
  )
}
