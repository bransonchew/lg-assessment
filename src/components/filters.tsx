import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'


export default function Filters({ categories }: { categories: Category[] }) {

  // Horizontal scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = 200

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      })
    }
  }
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Hide left/right scroll chevron
  const [firstRef, firstInView] = useInView({
    threshold: 1,
  })
  const [lastRef, lastInView] = useInView({
    threshold: 1,
  })

  return (
    <div className="relative text-muted-foreground">
      <div
        ref={ scrollContainerRef }
        className="flex items-center overflow-x-auto scrollbar-hide px-8"
      >

        {/*Follow more categories / Scroll left*/ }
        <button
          onClick={ scrollLeft }
          className="absolute left-0 bg-gradient-to-l from-transparent via-white/80 to-white pr-8 py-4 border-b"
        >
          { firstInView
            ? <Plus size={ 20 } strokeWidth={ 1.75 }/>
            : <ChevronLeft size={ 20 }/> }
        </button>

        {/*Categories*/ }
        { [{ id: -1, name: 'All' }, ...categories].map((cat, index) => (
          <Link
            key={ cat.id }
            className="text-sm text-nowrap"
            // Search params
            search={ { filter: index === 0 ? undefined : cat.name } }
            // Scrolling props
            ref={ index === 0
              ? firstRef
              : index === categories.length
                ? lastRef
                : undefined }
            activeOptions={ { exact: true } }
          >
            { ({ isActive }) => (
              <div
                className={ cn(
                  'p-4 border-b',
                  isActive && 'text-foreground font-medium border-b border-b-foreground',
                ) }
              >
                { cat.name }
              </div>
            ) }
          </Link>
        )) }

        {/*Scroll right*/ }
        <button
          onClick={ scrollRight }
          disabled={ lastInView }
          className="absolute right-0 bg-gradient-to-r from-transparent via-white/80 to-white pl-8 py-4 border-b"
        >
          <ChevronRight size={ 20 } className={ cn(lastInView && 'invisible') }/>
        </button>
      </div>
    </div>
  )
}