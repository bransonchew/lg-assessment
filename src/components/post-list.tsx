import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { limit } from '@/lib/constants'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Bookmark, Ellipsis } from 'lucide-react'


export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="divide-y">
      { posts.map(post => (
        <div key={ post.id } className="pt-6 pb-3">

          {/*Post Link*/ }
          <Link to="/$postId" params={ { postId: post.id } }>

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
            <div className="flex justify-between gap-6 sm:gap-8">

              {/*Post Text*/ }
              <div className="grow">
                <h1 className="text-xl sm:text-2xl font-bold capitalize mb-3">
                  { post.title }
                </h1>
                <h2 className="text-muted-foreground mb-6 line-clamp-2 antialiased">
                  { post.summary }
                </h2>

                {/*Desktop Actions*/ }
                <div className="hidden sm:flex justify-between items-center mr-6 text-muted-foreground">
                  <span className="text-sm">
                    { formatDate(new Date(post.publishDate)) }
                  </span>
                  <div>
                    <Button variant="ghost" size="icon" aria-label="bookmark" className="hover:bg-inherit">
                      <Bookmark strokeWidth={ 1 }/>
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="more" className="hover:bg-inherit">
                      <Ellipsis/>
                    </Button>
                  </div>
                </div>
              </div>

              {/*Post Image*/ }
              <div className="flex-none aspect-[3/2] w-20 sm:w-36">
                <img
                  src={ `https://picsum.photos/seed/${ post.id }/1200/800` }
                  alt={ post.title }
                />
              </div>

            </div>

            {/*Mobile Actions*/ }
            <div className="flex sm:hidden justify-between items-center text-muted-foreground">
              <span className="text-sm">
                { formatDate(new Date(post.publishDate)) }
              </span>
              <div>
                <Button variant="ghost" size="icon" aria-label="bookmark" className="hover:bg-inherit">
                  <Bookmark strokeWidth={ 1 }/>
                </Button>
                <Button variant="ghost" size="icon" aria-label="more" className="hover:bg-inherit">
                  <Ellipsis/>
                </Button>
              </div>
            </div>

          </Link>

        </div>
      )) }
    </div>
  )
}

export function PostListSkeleton() {
  return (
    <>
      { Array.from(Array(limit)).map((_, index) => (
        <div key={ index } className="grid gap-3 py-6">
          <div className="flex gap-2 items-center">
            <Skeleton className="size-8 rounded-3xl"/>
            <Skeleton className="w-24 h-4 rounded-xl"/>
          </div>
          <div className="flex justify-between gap-6">
            <div className="grow flex flex-col gap-3 py-1">
              <Skeleton className="w-11/12 h-6 rounded-xl"/>
              <Skeleton className="w-2/3 h-4 rounded-xl"/>
              <Skeleton className="w-1/3 h-4 rounded-xl"/>
            </div>
            <Skeleton className="aspect-[3/2] w-20 sm:w-36"/>
          </div>
        </div>
      )) }
    </>
  )
}
