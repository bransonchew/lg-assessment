import { Category } from '@/lib/types.ts'
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
    <div className="relative pb-4 border-b text-muted-foreground">
      <div
        ref={ scrollContainerRef }
        className="flex items-center gap-6 overflow-x-auto scrollbar-hide pr-8"
      >

        {/*Follow more categories / Scroll left*/ }
        { firstInView
          ?
          <button>
            <Plus size={ 20 } strokeWidth={ 1.5 }/>
          </button>
          :
          <button
            onClick={ scrollLeft }
            className="absolute left-0 bg-gradient-to-l from-transparent via-white/80 to-white pr-12"
          >
            <ChevronLeft size={ 20 }/>
          </button> }

        {/*Categories*/ }
        { [{ id: -1, name: 'All' }, ...categories].map((cat, index) => (
          <Link
            key={ cat.id }
            className="text-sm text-nowrap"
            ref={ index === 0
              ? firstRef
              : index === categories.length
                ? lastRef
                : undefined }
          >
            { cat.name }
          </Link>
        )) }

        {/*Scroll right*/ }
        { !lastInView &&
          <button
            onClick={ scrollRight }
            className="absolute right-0 bg-gradient-to-r from-transparent via-white/80 to-white pl-12"
          >
            <ChevronRight size={ 20 }/>
          </button> }
      </div>
    </div>
  )
}