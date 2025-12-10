'use client'

import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navigation } from '@/components/Navigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>🔥 El Fuego del Conocimiento Real</title>
        <meta name="description" content="El Fuego del Conocimiento Real - Proyecto Épico de Sabiduría Digital" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-950">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-flame-800/30 mt-16 py-8">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p className="flame-glow text-flame-500 font-semibold mb-2">
                  🔥 El Fuego del Conocimiento Real
                </p>
                <p className="text-sm">
                  Grado 33 - Constructor del Universo Interior
                </p>
                <p className="text-xs mt-2">
                  &quot;No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma.&quot;
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
