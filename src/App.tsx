import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/Dialog'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageTransition } from '@/components/transitions/PageTransition'

function Home() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-dvh flex items-center justify-center bg-neutral-50 px-6 text-neutral-900">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Jarvis Template</h1>
          <p className="text-neutral-600">React 19 · Vite · Tailwind v4 · Motion · Radix</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => setLoading((v) => !v)}>
                Toggle skeleton
              </Button>
            </TooltipTrigger>
            <TooltipContent>Demo of the Skeleton primitive</TooltipContent>
          </Tooltip>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Sparkles className="h-4 w-4" />
                Open dialog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hello from Jarvis</DialogTitle>
                <DialogDescription>
                  Animated via Tailwind v4 keyframe tokens, accessible via Radix.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        ) : null}
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
