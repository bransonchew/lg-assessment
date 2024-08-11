import Filters from '@/components/filters'
import PostList from '@/components/post-list'
import { Button } from '@/components/ui/button.tsx'
import { getPosts } from '@/lib/data'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'


// Search params validation
// const postSearchSchema = z.object({
//   limit: z.number().catch(8),  // 8 posts per page
//   offset: z.number().catch(0),  // start from first post
//   filter: z.string().catch('').optional(),
// })

// export type PostSearch = z.infer<typeof postSearchSchema>

// Route config
export const Route = createFileRoute('/')({
  component: PostsLayout,
  // validateSearch: postSearchSchema,
  //
  // // Search params
  // loaderDeps: ({ search: { offset, limit } }) => ({ offset, limit }),
  // loader: async ({ deps: { offset, limit } }) => ({
  //
  //   // Deferred for Suspense / Await
  //   postsPromise: defer(getPosts({
  //     pageParam: 0,
  //   })),
  // }),
  // staleTime: 30_000,  // revalidate after 30 seconds
})

function PostsLayout() {

  // const { postsPromise } = Route.useLoaderData()

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
  })

  return (
    <div className="grid justify-center p-8 gap-6">
      <Filters/>
      { status === 'success' && (
        <div className="divide-y">
          { data?.pages.map((group, index) => (
            <PostList key={ index } posts={ group.data }/>
          )) }
        </div>
      ) }
      <div className="flex justify-center">
        <Button
          onClick={ () => fetchNextPage() }
          disabled={ !hasNextPage || isFetchingNextPage }
        >
          { isFetchingNextPage
            ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Loading
              </>
            )
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load' }
        </Button>
      </div>
    </div>
  )
}