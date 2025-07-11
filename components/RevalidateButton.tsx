'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function RevalidateButton({ path }: { path: string }) {
  const [loading, setLoading] = useState(false)

  const handleRevalidate = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&path=${path}`
      )
      const data = await res.json()

      if (data.revalidated) {
        toast.success(`Page revalidated!`)
      } else {
        toast.error(`${data.message || data.error}`)
      }
    } catch (err:unknown) {
      toast.error(`Something went wrong.${(err as Error).message || ''}`)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleRevalidate}
      disabled={loading}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? 'Revalidating...' : 'Revalidate This Page'}
    </button>
  )
}
