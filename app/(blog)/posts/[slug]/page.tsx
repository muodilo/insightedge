import RevalidateButton from '@/components/RevalidateButton'
import { Article } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamicParams = true

export const revalidate = 60 



export async function generateStaticParams() {
  const res = await fetch('https://dev.to/api/articles')
  const posts: Article[] = await res.json()

  return posts.slice(0, 12).map((post) => ({
    slug: post.id.toString(),
  }))
}

export default async function PostPage(context : { params: Promise<{ slug: string }> }) {
  const params = await context.params
  const res = await fetch(`https://dev.to/api/articles/${params.slug}`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return notFound()

  const post: Article = await res.json()
  const generatedAt = new Date().toISOString()

  return (
    <main className="max-w-3xl mx-auto py-8 mt-20">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <RevalidateButton path={`/posts/${params.slug}`} />
      <p className="text-gray-500">Generated at: {generatedAt}</p>
      <Image
        src={post.cover_image || '/default-cover.jpg'}
        alt={post.title}
        width={1000}
        placeholder='blur'
        blurDataURL={'/default-cover.jpg'}
        height={420}
        className="w-full rounded"
      />
      <p className="mt-4">{post.description}</p>
      <div
        className="prose mt-6"
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />
    </main>
  )
}
