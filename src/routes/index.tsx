import Filters from '@/components/filters'
import PostList, { PostListSkeleton } from '@/components/post-list'
import { Button } from '@/components/ui/button'
import { getCategories, getPosts } from '@/lib/data'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Dot, Loader2 } from 'lucide-react'
import { z } from 'zod'


// Search params validation
const postSearchSchema = z.object({
  filter: z.string().catch('').optional(),
})

// Route config
export const Route = createFileRoute('/')({
  component: PostsLayout,

  // Validate search params
  validateSearch: postSearchSchema,

  // Search params
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: async () => ({
    categories: await getCategories(),  // critical data
  }),
  staleTime: Infinity,  // categories rarely change
})

function PostsLayout() {

  // Categories for filter
  const { categories } = Route.useLoaderData()

  // Search params
  const { filter } = Route.useSearch()

  // Infinite querying / Load more
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['posts', filter],
    queryFn: p => getPosts({ ...p, filter }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor,
    staleTime: 600_000,  // revalidate after 60 seconds
  })

  return (
    <div className="flex flex-col items-center p-8 pt-3 sm:pt-8 gap-6 sm:gap-8">

      {/*Category select*/ }
      <div className="w-full max-w-3xl sticky top-0">
        <Filters categories={ categories } selectedFilter={ filter }/>
      </div>

      {/*Post list*/ }
      { isSuccess && !isRefetching &&
        <div className="max-w-3xl divide-y">
          { data?.pages.map((group, index) => (
            <PostList key={ index } posts={ group.data }/>
          )) }
        </div> }

      {/*Loading Skeleton*/ }
      { isFetching &&
        <div className="w-full max-w-3xl divide-y">
          <PostListSkeleton/>
        </div> }

      {/*Post list load actions*/ }
      <div className="flex justify-center">
        { hasNextPage
          ? <Button
            onClick={ () => fetchNextPage() }
            disabled={ isFetchingNextPage || isRefetching }
          >
            { isFetchingNextPage || isRefetching
              ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Loading
              </>
              : 'Load More' }
          </Button>
          : <Dot size={ 32 } className="text-muted-foreground"/>
        }
      </div>

    </div>
  )
}
