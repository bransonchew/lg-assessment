import Filters from '@/components/filters'
import PostList from '@/components/post-list'
import { Button } from '@/components/ui/button.tsx'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { limit } from '@/lib/constants.ts'
import { getCategories, getPosts } from '@/lib/data'
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

  // Validate search params
  validateSearch: postSearchSchema,

  // Search params
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: async () => ({
    categories: await getCategories(),
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
    // error,
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
      <div className="w-full max-w-3xl sticky top-0 bg-white">
        <Filters categories={ categories } selectedFilter={ filter }/>
      </div>

      {/*Post list*/ }
      { isSuccess && !isRefetching &&
        <div className="max-w-3xl divide-y">
          { data?.pages.map((group, index) => (
            <PostList key={ index } posts={ group.data }/>
          )) }
        </div> }

      {/*Initial Loading Skeleton*/ }
      { isFetching &&
        <div className="w-full max-w-3xl divide-y">
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
                <Skeleton className="w-36 h-24"/>
              </div>
            </div>
          )) }
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