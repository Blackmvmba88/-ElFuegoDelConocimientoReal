'use client'

import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="border-b border-flame-800/30 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔥</span>
            <div>
              <h1 className="text-xl font-bold text-flame-400 flame-glow">
                El Fuego del Conocimiento Real
              </h1>
              <p className="text-xs text-gray-400">Grado 33 - Constructor del Universo Interior</p>
            </div>
          </div>
          
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-flame-600 transition-all duration-200"
              title={theme === 'dark' ? 'Modo Luz (Día)' : 'Modo Sombra (Noche)'}
            >
              {theme === 'dark' ? (
                <span className="text-xl">☀️</span>
              ) : (
                <span className="text-xl">🌙</span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
