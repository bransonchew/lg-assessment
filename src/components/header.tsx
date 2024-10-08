import { ModeToggle } from '@/components/mode-toggle.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link } from '@tanstack/react-router'


export default function Header() {
  return (
    <header className="flex gap-2 px-5 py-3 justify-between border-b">
      <nav>
        <Link to="/" className="text-4xl font-['Times',_serif] font-bold">
          Median
        </Link>
      </nav>
      <div className="flex items-center gap-3 sm:gap-8">
        <ModeToggle/>
        <Button className="rounded-3xl">Sign in</Button>
      </div>
    </header>
  )
}