'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'Hay un problema con la configuración del servidor.',
    AccessDenied: 'Acceso denegado. No tienes permiso para acceder.',
    Verification: 'El token ha expirado o ya ha sido utilizado.',
    Default: 'Ocurrió un error durante la autenticación.',
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-red-800/30">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-400 mb-2">
            Error de Autenticación
          </h1>
          <p className="text-gray-400">
            {errorMessage}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full text-center px-6 py-3 rounded-lg bg-flame-600 hover:bg-flame-700 transition-all duration-200 text-white font-semibold"
          >
            Intentar de Nuevo
          </Link>
          
          <Link
            href="/"
            className="block w-full text-center px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-white"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
