import Filters from '@/components/filters'
import PostList from '@/components/post-list'
import { Button } from '@/components/ui/button.tsx'
import { getPosts } from '@/lib/data'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Dot, Loader2 } from 'lucide-react'
import { z } from 'zod'


// Search params validation
const postSearchSchema = z.object({
  filter: z.string().catch('').optional(),
})

export type PostSearch = z.infer<typeof postSearchSchema>

// Route config
export const Route = createFileRoute('/')({
  component: PostsLayout,
  validateSearch: postSearchSchema,

  // Search params
  // loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: async () => ({
    initialPosts: await getPosts({
      pageParam: 0,
    }),
  }),
})

function PostsLayout() {

  // Infinite querying / Load more
  const {
    data,
    // error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor,
    staleTime: 30_000,  // revalidate after 30 seconds
  })

  return (
    <div className="grid justify-center p-8 gap-6">

      <Filters/>

      {/*Loading Skeleton*/}
      { status === 'pending' && <p>Loading...</p> }

      {/*Post list*/}
      { status === 'success' && (
        <div className="divide-y">
          { data?.pages.map((group, index) => (
            <PostList key={ index } posts={ group.data }/>
          )) }
        </div>
      ) }

      {/*Post list load actions*/}
      <div className="flex justify-center">
        { hasNextPage
          ? (
            <Button
              onClick={ () => fetchNextPage() }
              disabled={ isFetchingNextPage }
            >
              { isFetchingNextPage
                ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Loading
                </>
                : 'Load More' }
            </Button>
          )
          : <Dot size={ 32 } className="text-muted-foreground"/>
        }
      </div>

    </div>
  )
}