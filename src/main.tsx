// Dark mode
import { ThemeProvider } from '@/components/theme-provider'

// Include mock API
import { makeServer } from '@/mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

if (import.meta.env.DEV) {
  makeServer({ environment: 'development' })
}

// Create tanstack query client
const queryClient = new QueryClient()

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={ queryClient }>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={ router }/>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

