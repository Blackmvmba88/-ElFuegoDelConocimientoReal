import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'El Fuego del Conocimiento Real',
  description: 'Proyecto Épico de Web UI - Grado 33 Constructor del Universo Interior',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
