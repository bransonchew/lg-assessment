import { Card, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { getPosts } from '@/lib/data'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/posts')({
  loader: getPosts,
  component: Posts,
})

function Posts() {

  const posts = Route.useLoaderData()

  return (
    <div className="grid p-8 gap-3">
      { posts.map((post, index) => (
        <Card key={ index }>
          <CardHeader>
            <CardTitle>{ post.title }</CardTitle>
          </CardHeader>
        </Card>
      )) }
    </div>
  )
}