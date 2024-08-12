import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button.tsx'
import { Post } from '@/lib/data.ts'
import { formatDate } from '@/lib/utils.ts'
import { Link } from '@tanstack/react-router'
import { Bookmark, Ellipsis } from 'lucide-react'


export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-3xl divide-y">
      { posts.map((post, index) => (
        <div key={ post.id } className="pt-6 pb-3">

          {/*Post Link*/ }
          <Link className="">

            {/*Author*/ }
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="size-6">
                <AvatarImage src={ post.author.avatar }/>
                <AvatarFallback>{ post.author.name[0] }</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                { post.author.name }
              </span>
            </div>

            {/*Post Details*/ }
            <div className="flex justify-between gap-6">

              {/*Post Text*/ }
              <div className="grow">
                <div className="text-2xl font-bold capitalize mb-3">
                  { post.title }
                </div>
                <p className="text-muted-foreground mb-6">
                  { post.summary }
                </p>
                <div className="flex justify-between items-center mr-3 text-muted-foreground">
                  <span className="text-sm">
                    <span>{ index + 1 }</span>
                    { formatDate(new Date(post.publishDate)) }
                  </span>
                  <div>
                    <Button variant="ghost" size="icon" aria-label="bookmark">
                      <Bookmark strokeWidth={ 1 }/>
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="more">
                      <Ellipsis/>
                    </Button>
                  </div>
                </div>
              </div>

              {/*Post Image*/ }
              <div className="flex-none">
                <img
                  src={ `https://picsum.photos/seed/${ post.id }/1200/800` }
                  alt={ post.title }
                  width={ 150 }
                  height={ 100 }
                />
              </div>

            </div>

          </Link>
        </div>
      )) }
    </div>
  )
}