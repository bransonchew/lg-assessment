import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { getPosts } from '@/lib/data'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  loader: getPosts,
  component: Posts,
})

function Posts() {

  const posts = Route.useLoaderData()

  return (
    <div className="grid px-16 py-8 gap-3">
      { posts.map((post, index) => (
        <Card key={ index }>
          <CardHeader>
            <CardTitle className="capitalize">
              { post.title }
            </CardTitle>
          </CardHeader>
          <CardContent>
            { post.summary }
          </CardContent>
        </Card>
      )) }
    </div>
  )
}