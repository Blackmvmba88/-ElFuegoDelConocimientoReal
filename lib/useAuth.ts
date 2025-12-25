/**
 * Hook for authentication utilities in client components.
 */

'use client'

import { useSession } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  // Helper to check if current user is the creator
  const isCreator = Boolean((user as any)?.isCreator)

  // Helper to check if current user is an admin
  const isAdmin = Boolean((user as any)?.isAdmin)

  // Get the access token for backend API calls
  const accessToken = (user as any)?.accessToken

  // Helper to get auth headers for API calls
  const getAuthHeaders = () => {
    if (!accessToken) return {}
    return {
      'Authorization': `Bearer ${accessToken}`
    }
  }

  return {
    session,
    user,
    isLoading,
    isAuthenticated,
    isCreator,
    isAdmin,
    accessToken,
    getAuthHeaders,
  }
}

/**
 * Usage example:
 * 
 * ```tsx
 * import { useAuth } from '@/lib/useAuth'
 * 
 * export default function MyComponent() {
 *   const { isAuthenticated, isCreator, getAuthHeaders } = useAuth()
 * 
 *   const fetchData = async () => {
 *     const response = await fetch('/api/data', {
 *       headers: getAuthHeaders()
 *     })
 *     return response.json()
 *   }
 * 
 *   if (isCreator) {
 *     return <AdminPanel />
 *   }
 * 
 *   return <RegularContent />
 * }
 * ```
 */
