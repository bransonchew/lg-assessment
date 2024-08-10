import Filters from '@/components/filters'
import PostList from '@/components/post-list'
import { getPosts, Post } from '@/lib/data'
import { Await, createFileRoute, defer } from '@tanstack/react-router'
import { Suspense } from 'react'


export const Route = createFileRoute('/')({
  loader: async () => ({
    postsPromise: defer(getPosts()),
  }),
  component: Posts,
})

function Posts() {

  const { postsPromise } = Route.useLoaderData()

  return (
    <div className="grid px-16 py-8 gap-3">
      <Filters/>
      <Suspense fallback={ <p>Loading...</p> }>
        <Await promise={ postsPromise }>
          { (posts: Post[]) => <PostList posts={ posts }/> }
        </Await>
      </Suspense>
    </div>
  )
}