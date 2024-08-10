import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Post } from '@/lib/data.ts'


export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-8">
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