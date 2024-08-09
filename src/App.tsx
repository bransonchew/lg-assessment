import Page from '@/app/page'
import { ThemeProvider } from '@/components/theme-provider'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Page/>
    </ThemeProvider>
  )
}

export default App
