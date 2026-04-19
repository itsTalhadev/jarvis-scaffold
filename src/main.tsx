import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { TooltipProvider } from '@/components/ui/Tooltip'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider delayDuration={150} skipDelayDuration={0}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} newestOnTop pauseOnHover />
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>,
)
