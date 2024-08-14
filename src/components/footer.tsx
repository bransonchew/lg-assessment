import { Link } from '@tanstack/react-router'


export default function Footer() {
  return (
    <footer className="py-6 border-t">
      <nav className="flex justify-center gap-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          About
        </Link>
        <Link to="/" className="hover:text-foreground">
          Careers
        </Link>
        <Link to="/" className="hover:text-foreground">
          Blog
        </Link>
      </nav>
    </footer>
  )
}