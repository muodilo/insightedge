import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/types'

export default async function LatestBlogs() {
  const res = await fetch('https://dev.to/api/articles?per_page=12', {

    next: { revalidate: 60 }, 
  })
  const blogs: Article[] = await res.json()

  return (
    <section className="pt-[60px] ">
      <h2 className="text-xl font-bold mb-6">Latest Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/posts/${blog.id}`}
            className="border rounded overflow-hidden hover:shadow-lg transition"
          >
            {blog.cover_image && (
              <Image
                src={blog.cover_image || '/images/default-cover.jpg'}
                alt={blog.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.readable_publish_date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
