'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

interface ProtectedRouteProps {
  children: ReactNode
  requireCreator?: boolean
  fallbackUrl?: string
}

/**
 * Component wrapper to protect routes requiring authentication.
 * 
 * Usage:
 * ```tsx
 * <ProtectedRoute>
 *   <YourProtectedContent />
 * </ProtectedRoute>
 * ```
 * 
 * For creator-only routes:
 * ```tsx
 * <ProtectedRoute requireCreator={true}>
 *   <AdminContent />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({ 
  children, 
  requireCreator = false,
  fallbackUrl = '/auth/signin'
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🔥</div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect(fallbackUrl)
  }

  if (requireCreator && !(session.user as any)?.isCreator) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-red-800/30">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-2xl font-bold text-red-400 mb-2">
              Acceso Denegado
            </h1>
            <p className="text-gray-400 mb-6">
              Esta sección está reservada solo para el creador del proyecto.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 rounded-lg bg-flame-600 hover:bg-flame-700 transition-all duration-200 text-white font-semibold"
            >
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
