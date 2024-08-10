import { Link } from '@tanstack/react-router'


export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <nav className="flex justify-center gap-8 text-sm text-muted-foreground">
        <Link to="/">
          About
        </Link>
        <Link to="/">
          Careers
        </Link>
        <Link to="/">
          Blog
        </Link>
      </nav>
    </footer>
  )
}