import { Routes, Route } from 'react-router'
import { PageTransition } from '@/components/transitions/PageTransition'

/** Minimal starter shell — replace via codegen with real routes and pages. */
function Home() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-50 px-6 text-neutral-900">
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Jarvis Template</h1>
        <p className="text-sm text-neutral-600">
          Scaffold placeholder. Generated apps replace this view by updating{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">src/App.tsx</code>{' '}
          and adding pages under <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">src/pages/</code>.
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </PageTransition>
  )
}

export default App
