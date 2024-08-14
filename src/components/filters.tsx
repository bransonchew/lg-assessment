import { Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'


type Props = {
  categories: Category[]
  selectedFilter?: string
}

export default function Filters({ categories, selectedFilter }: Props) {

  // Horizontal scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAmount = 200

  // Hide horizontal scroll chevrons
  const [firstRef, firstInView] = useInView({
    threshold: 1,
  })
  const [lastRef, lastInView] = useInView({
    threshold: 1,
  })

  // Selected category
  const selectedRef = useRef<HTMLDivElement>(null)

  // Chevrons
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

  // Scroll to the selected filter when the component mounts
  useEffect(() => {
    if (scrollContainerRef.current && selectedRef.current) {

      const containerWidth = scrollContainerRef.current.offsetWidth
      const selectedOffsetLeft = selectedRef.current.offsetLeft
      const selectedWidth = selectedRef.current.offsetWidth

      // Calculate scroll position to center the selected filter
      const scrollPosition = selectedOffsetLeft - (containerWidth / 2) + (selectedWidth / 2)

      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
      })
    }
  }, [])

  return (
    <div className="relative text-muted-foreground">
      <div
        ref={ scrollContainerRef }
        className="flex items-center overflow-x-auto scrollbar-hide"
      >

        {/*Follow more categories / Scroll left*/ }
        <button
          onClick={ scrollLeft }
          className="sticky left-0 bg-gradient-to-l from-transparent via-white/80 to-white pr-4 py-4 border-b"
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
                : null }
            activeOptions={ { exact: true } }
          >
            { ({ isActive }) => (
              <div
                ref={ selectedFilter === cat.name ? selectedRef : null }
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
          className="sticky right-0 bg-gradient-to-r from-transparent via-white/80 to-white pl-4 py-4 border-b"
        >
          <ChevronRight size={ 20 } className={ cn(lastInView && 'invisible') }/>
        </button>
      </div>
    </div>
  )
}