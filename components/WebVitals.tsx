'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (['LCP', 'FID', 'CLS'].includes(metric.name)) {
      console.log('[Web Vitals]', metric)

      const body = JSON.stringify(metric)

      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/web-vitals', body)
      } else {
        fetch('/api/web-vitals', {
          body,
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
  })

  return null 
}
