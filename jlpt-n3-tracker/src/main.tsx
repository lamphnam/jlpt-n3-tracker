import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white',
        }}
      />
    </ThemeProvider>
  </React.StrictMode>,
)