import { Routes, Route } from 'react-router'

/** Minimal starter shell — replace via codegen with real routes and pages. */
function Home() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Jarvis Template</h1>
        <p className="text-sm text-muted-foreground">
          Scaffold placeholder. Generated apps replace this view by updating{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">src/App.tsx</code>{' '}
          and adding pages under <code className="rounded bg-muted px-1 py-0.5 text-xs">src/pages/</code>.
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
