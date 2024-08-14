import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { getPost } from '@/lib/data'
import { cn, formatDate } from '@/lib/utils'
import { Await, createFileRoute, defer, Link } from '@tanstack/react-router'
import { Bookmark, Ellipsis, Heart, MessageCircle, Share } from 'lucide-react'
import { Suspense } from 'react'


export const Route = createFileRoute('/$postId')({
  component: Post,

  // Deferred data loading
  loader: ({ params }) => ({
    postPromise: defer(getPost(params.postId)),
  }),
})

function Post() {

  const { postPromise } = Route.useLoaderData()

  return (
    <Suspense fallback={ <PostSkeleton/> }>
      <Await promise={ postPromise }>
        { post => (
          <div className="grid items-center gap-16 max-w-2xl px-6 py-12 mx-auto">

            {/*Summary*/ }
            <div className="space-y-10">

              {/*Title*/ }
              <div className="space-y-5">
                <div className="text-5xl font-bold capitalize">
                  { post.title }
                </div>
                <p className="text-2xl font-light text-muted-foreground">
                  { post.summary }
                </p>
              </div>

              {/*Author*/ }
              <div className="flex items-center gap-3 mb-3 antialiased">
                <Link>
                  <Avatar className="size-12">
                    <AvatarImage src={ post.author.avatar }/>
                    <AvatarFallback>{ post.author.name[0] }</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="space-y-1">
                  <Link className="hover:underline">
                    { post.author.name }
                  </Link>
                  <span>&nbsp; · &nbsp;</span>
                  <span className="cursor-pointer hover:text-foreground hover:underline">
                    Follow
                  </span>
                  <div className="text-sm text-muted-foreground">
                    11 min read&nbsp; · &nbsp;{ formatDate(new Date(post.publishDate)) }
                  </div>
                </div>
              </div>

              {/*Actions*/ }
              <div className="flex justify-between items-center py-2 border-y text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="hover:bg-inherit">
                    <Heart size={ 20 } strokeWidth={ 1.5 }/>
                  </Button>
                  <span className=" mr-6">53</span>
                  <Button variant="ghost" size="icon" className="hover:bg-inherit">
                    <MessageCircle size={ 20 } strokeWidth={ 1.5 }/>
                  </Button>
                  <span className="ml-px">16</span>
                </div>
                <div>
                  <Button variant="ghost" size="icon" className="hover:bg-inherit">
                    <Bookmark size={ 20 } strokeWidth={ 1.5 }/>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-inherit">
                    <Share size={ 20 } strokeWidth={ 1.5 }/>
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-inherit">
                    <Ellipsis size={ 20 } strokeWidth={ 1.5 }/>
                  </Button>
                </div>
              </div>

            </div>

            {/*Image*/ }
            <div>
              <img
                src={ `https://picsum.photos/seed/${ post.id }/2700/1800` }
                alt={ post.title }
                width={ 720 }
                height={ 480 }
              />
            </div>

            {/*Content*/ }
            <p className="font-serif text-xl tracking-wide leading-relaxed antialiased">
              { lorem }
            </p>

            {/*Categories*/ }
            <div className="flex gap-3 flex-wrap">
              { post.categories.map(cat => (
                <Link
                  key={ cat.id }
                  className={ cn(
                    badgeVariants({ variant: 'secondary' }),
                    'text-sm font-normal px-3.5 py-1.5',
                  ) }
                  to="/"
                  search={ { filter: cat.name } }
                >
                  { cat.name }
                </Link>
              )) }
            </div>

          </div>
        ) }
      </Await>
    </Suspense>
  )
}

function PostSkeleton() {
  return (
    <div className="grid items-center gap-12 max-w-2xl px-6 py-16 mx-auto">
      <div className="space-y-6">
        <div className="space-y-3.5">
          <Skeleton className="w-11/12 h-16 rounded-2xl"/>
          <Skeleton className="w-5/6 h-6 rounded-2xl"/>
          <Skeleton className="w-2/3 h-6 rounded-2xl"/>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-2xl"/>
          <Skeleton className="w-36 h-6 rounded-2xl"/>
        </div>
      </div>
      <Separator/>
      <Skeleton className="aspect-[3/2] w-full"/>
      <div className="grid gap-3.5">
        <Skeleton className="w-full h-6 rounded-lg"/>
        <Skeleton className="w-full h-6 rounded-lg"/>
        <Skeleton className="w-full h-6 rounded-lg"/>
        <Skeleton className="w-full h-6 rounded-lg"/>
        <Skeleton className="w-5/6 h-6 rounded-lg"/>
      </div>
    </div>
  )
}

const lorem =
  'Lorem ipsum odor amet, consectetuer adipiscing elit. Cursus facilisi eros feugiat facilisi amet. Sapien torquent orci netus litora ut porttitor. Nascetur mi venenatis lectus massa ornare eget. Sed suspendisse magna torquent parturient; eu risus mattis etiam. Sapien libero vivamus pulvinar facilisis mollis malesuada mus aliquam fusce. Elit platea iaculis aliquam ridiculus odio dui; porta maecenas. Amet nam condimentum primis lacus ipsum consequat auctor volutpat.\n' +
  'Varius quam consequat adipiscing fusce eleifend cursus senectus. Iaculis eros lectus, libero sed curabitur senectus tempus. Convallis fames consectetur orci eget sodales laoreet varius curae. Felis pretium sed vel pulvinar sapien; nec eget leo? Orci nulla ante ridiculus volutpat molestie. Mus finibus vestibulum urna leo fames. Mus mollis parturient cubilia quam cras at.\n' +
  'Purus fermentum facilisi sociosqu class velit eget metus aliquet sociosqu. Porttitor cursus turpis malesuada sodales fames curae libero quis. Vehicula lectus cubilia accumsan augue porttitor purus ultricies consequat etiam. Primis id maecenas etiam libero conubia suscipit. Curabitur orci pharetra magnis lorem, sodales enim porttitor. Per lobortis luctus mi adipiscing in lectus interdum. Natoque velit inceptos tempor tempus egestas bibendum. Euismod fusce turpis iaculis morbi velit pharetra pulvinar fermentum.'
