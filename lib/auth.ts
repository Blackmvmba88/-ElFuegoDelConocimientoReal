import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'read:user user:email',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Exchange GitHub profile with backend
      if (account?.provider === 'github' && profile) {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
        
        try {
          const response = await fetch(`${backendUrl}/api/auth/github`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: account.access_token,
              redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            // Store backend token in user object for later use
            user.accessToken = data.access_token
          }
        } catch (error) {
          console.error('Error exchanging token with backend:', error)
        }
      }
      
      return true
    },
    async jwt({ token, user, profile }) {
      // On initial sign in, store user data
      if (user) {
        token.accessToken = user.accessToken
      }
      
      if (profile && 'id' in profile && 'login' in profile) {
        token.githubId = profile.id as string
        token.githubUsername = profile.login as string
      }

      // Fetch user info from backend to get roles
      if (token.accessToken) {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
          const response = await fetch(`${backendUrl}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            token.isCreator = userData.is_creator
            token.isAdmin = userData.is_admin
          }
        } catch (error) {
          console.error('Error fetching user info:', error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        session.user.accessToken = token.accessToken as string
        session.user.githubId = token.githubId as string
        session.user.githubUsername = token.githubUsername as string
        session.user.isCreator = token.isCreator as boolean
        session.user.isAdmin = token.isAdmin as boolean
      }
      
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
